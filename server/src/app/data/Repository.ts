/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import pluralize from 'pluralize';

import Database from './Database';
import AllySqlRepositoryPrimaryKeyError from '../../helpers/errors/AllySqlRepositoryPrimaryKeyError';
import AllySqlJoinTypeError from '../../helpers/errors/AllySqlJoinTypeError';

interface ITableSchema {
  [fieldName: string]: {
    returning?: boolean;
    primary?: boolean;
    required?: boolean;
    type: any;
  };
}

interface IJoin {
  repo: Repository<any>;
  on: IWhere;
  attrs?: string[];
  as?: string;
  type: 'many' | 'single' | 'count';
  side?: 'LEFT' | 'RIGHT' | 'INNER';
  join?: IJoin[];
  op?: string;
}

interface IWhere {
  [field: string]: any;
}

interface IQuery<T extends ITableSchema> {
  attrs?: Array<keyof T>;
  limit?: number;
  offset?: number;
  where?: IWhere;
  join?: IJoin[];
}

type ITableReturn<T extends ITableSchema> = {
  [K in keyof T]: T[K]['type'];
};

type ITableColumns<T extends ITableSchema> = {
  [K in keyof Partial<T>]: T[K]['type'];
};

export default class Repository<T extends ITableSchema> {
  private db: Database;
  public tableName: string;
  public tableSchema: ITableSchema;
  public fields: string[];
  public returnFields: string[];
  public primaryFields: string[];
  public requiredFields: string[];

  constructor(tableName: string, tableSchema: T) {
    this.db = Database.getInstance();
    this.tableName = tableName;
    this.tableSchema = tableSchema;

    const keys = Object.keys(tableSchema);
    const values = Object.values(tableSchema);

    this.fields = keys;
    this.primaryFields = keys.filter((k, i) => values[i].primary || false);
    this.requiredFields = keys.filter((k, i) => values[i].required || true);
    this.returnFields = keys.filter((k, i) => values[i].returning !== false);

    if (this.primaryFields.length < 1) {
      throw new AllySqlRepositoryPrimaryKeyError();
    }
  }

  async find(query: IQuery<T> = {}): Promise<ITableReturn<T>[]> {
    const { attrs = this.returnFields, limit = null, offset = 0, where = {}, join = [] } = query;
    const formattedWhere = Object.entries(where);

    const getSelect = attrs.map(a => ` ${this.tableName}.${a} `);
    const getWhere = formattedWhere[0]
      ? `WHERE ${formattedWhere.map(w => `\n${this.tableName}.${w[0]} = ${Database.escape(w[1])}`).join(' AND ')}`
      : '';
    const getGroupBy = join.length ? ` GROUP BY ${this.tableName}.${this.primaryFields[0]} ` : '';
    const getLimit = limit ? ` LIMIT ${limit} ` : '';
    const getOffset = offset ? ` OFFSET ${offset} ` : '';

    const sql = `
      SELECT ${getSelect}
      ,${Repository.getJoins(join, this).fields()}
      FROM ${this.tableName}
      ${Repository.getJoins(join, this).joins()}
      ${getWhere}
      ${getGroupBy}
      ${getLimit}
      ${getOffset}
    `;

    const results = this.db.query<ITableReturn<T>>(sql, []);

    return results;
  }

  async findOne(query: IQuery<T>) {
    const results = await this.find({ ...query, limit: 1 });
    return results[0] || null;
  }

  async delete({ where, operator = '=' }: { where: IWhere; operator?: string }) {
    const formattedWhere = Object.entries(where);
    const sql = `
      DELETE FROM ${this.tableName}
      WHERE ${formattedWhere
        .map(([key, value]) => `\n${this.tableName}.${key} ${operator} ${Database.escape(value)}`)
        .join(' AND ')}
    `;
    const { affectedRows } = await this.db.execute(sql, []);
    return affectedRows;
  }

  async update({ where, operator = '=', set }: { where: IWhere; operator?: string; set: IWhere }) {
    const formattedWhere = Object.entries(where);
    const formattedSet = Object.entries(set);
    const sql = `
      UPDATE ${this.tableName}
      SET ${formattedSet.map(([key, value]) => ` ${this.tableName}.${key} = ${Database.escape(value)} `)}
      WHERE ${formattedWhere
        .map(([key, value]) => ` ${this.tableName}.${key} ${operator} ${Database.escape(value)} `)
        .join(' AND ')}
    `;
    const { affectedRows } = await this.db.execute(sql, []);
    return affectedRows;
  }

  async create(schema: ITableColumns<T>, returning = true): Promise<number | ITableColumns<T>> {
    const sql = `
      INSERT INTO ${this.tableName}
        (${Object.keys(schema).join(', ')})
        VALUES
        (${Database.escape(Object.values(schema).join(', '))});
    `;
    const { insertId } = await this.db.execute(sql, []);

    if (!returning) {
      return insertId;
    }

    let res = await this.findOne({
      where: { [this.primaryFields[0]]: insertId },
    });
    if (res) return res;

    res = await this.findOne({
      where: { [this.primaryFields[1]]: insertId },
    });
    return res;
  }

  private static getJoins(join: IJoin[], upperRepository: Repository<any>) {
    return {
      fields(): string[] {
        return join.map(j => {
          const attrs = j.attrs || j.repo.returnFields;
          const getJoinName = j.as || pluralize(j.repo.tableName);
          const getAttrs = attrs.map(attr => ` '${attr}', ${j.repo.tableName}.${attr}, `);
          const getObjectFields = attrs.map(attr => ` '${attr}', ${j.repo.tableName}.${attr} `);
          const getInnerJoins: string[] | string = j.join
            ? j.join.map(
                iJ =>
                  ` '${iJ.as || pluralize(iJ.repo.tableName)}', ${Repository.getJoins(
                    j.join as IJoin[],
                    j.repo,
                  ).fields()} `,
              )
            : '';

          if (j.type === 'count') {
            return `
              COUNT(
                DISTINCT ${j.repo.tableName}.${j.repo.primaryFields[0]}
              ) AS ${getJoinName},
            `;
          }

          if (j.type === 'many') {
            return `
              IF(
                ${j.repo.tableName}.${j.repo.primaryFields[0]} IS NULL,
                JSON_ARRAY(),
                JSON_ARRAYAGG(
                  JSON_OBJECT(
                    ${getAttrs}
                    ${getInnerJoins}
                  )
                )
              ) AS ${getJoinName},
            `;
          }
          if (j.type === 'single') {
            return `
              JSON_OBJECT(
                ${getObjectFields}
              ) AS ${getJoinName},
            `;
          }

          throw new AllySqlJoinTypeError();
        });
      },
      joins(): string[] | string {
        if (join) {
          return join.map(j => {
            const getOn =
              j.on && `ON ${Object.entries(j.on).map(([key, value]) => `\n${j.repo.tableName}.${key} = ${value}`)}`;

            const getInnerJoins = j.join && Repository.getJoins(j.join, j.repo).joins();
            return `
              ${j.side || 'LEFT'} JOIN
                ${j.repo.tableName} 
                  ${getOn}
                ${getInnerJoins}
            `;
          });
        }
        return '';
      },
    };
  }
}
