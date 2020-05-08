/* eslint-disable new-cap */
/* eslint-disable arrow-body-style */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
import pluralize from 'pluralize';

import Database from './Database';
import AllySqlRepositoryPrimaryKeyError from '../helpers/errors/AllySqlRepositoryPrimaryKeyError';

interface ISchema {
  [fieldName: string]: {
    primary?: boolean;
    required?: boolean;
    returning?: boolean;
  };
}

interface IQueryOne {
  attrs?: string[];
  where?: IWhere;
  join?: IJoin[];
  offset?: number;
}

interface IQueryMany extends IQueryOne {
  limit?: number;
}

interface IDeleteQuery {
  where: IWhere;
}

type IWhere = {
  [field: string]: string | number | boolean;
};

interface IJoin {
  repo: Repository;
  attrs: string[];
  join: IJoin[];
  on: IWhere;
  as: string;
  type: 'many' | 'single';
}

export default class Repository {
  public tableName: string;
  public tableSchema: ISchema;
  public fields: string[];
  public primaryFields: string[];
  public requiredFields: string[];
  public returnFields: string[];

  constructor(private readonly db: Database, tableName: string, tableSchema: ISchema) {
    this.tableName = tableName;
    this.tableSchema = tableSchema;

    const keys = Object.keys(tableSchema);
    const values = Object.values(tableSchema);

    this.fields = keys;
    this.primaryFields = keys.filter((k, i) => values[i].primary || false);
    this.requiredFields = keys.filter((k, i) => values[i].required || false);
    this.returnFields = keys.filter((k, i) => values[i].returning || true);

    if (this.primaryFields.length < 1) {
      throw new AllySqlRepositoryPrimaryKeyError();
    }
  }

  async find(query: IQueryMany = {}): Promise<any> {
    const { attrs = this.returnFields, limit = null, offset = 0, where = {}, join = [] } = query;

    const formattedWhere = Object.entries(where as object);

    const getSelect = attrs.map(a => ` ${this.tableName}.${a} `);
    const getWhere = formattedWhere[0]
      ? `WHERE ${formattedWhere.map(w => `\n${this.tableName}.${w[0]} = ${Database.escape(w[1])}`)}`
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

    const results = this.db.query(sql, []);

    return results;
  }

  async findOne(query: IQueryOne) {
    const results = await this.find({ ...query, limit: 1 });
    return results[0] || null;
  }

  async delete({ where }: IDeleteQuery) {
    const formattedWhere = Object.entries(where);
    const sql = `
      DELETE FROM ${this.tableName}
      WHERE ${formattedWhere.map(w => `\n${this.tableName}.${w[0]} = ${Database.escape(w[1])}`)}
    `;
    const rows = await this.db.query<any>(sql, []);
    return rows.affectedRows;
  }

  async create(schema: object, returning = true) {
    const sql = `
      INSERT INTO ${this.tableName}
        (${Object.keys(schema)})
        VALUES
        (${Database.escape(Object.values(schema))});
    `;
    const { insertId } = await this.db.query<any>(sql, []);

    if (returning) {
      const res = await this.findOne({
        where: { [this.primaryFields[0]]: insertId },
      });
      if (res) return res;

      return this.findOne({
        where: { [this.primaryFields[1]]: insertId },
      });
    }
    return insertId;
  }

  protected static getJoins(join: IJoin[], upperRepository: Repository) {
    return {
      fields: (): string | string[] => {
        return join.map(j => {
          const attrs = j.attrs || j.repo.returnFields;
          const getJoinName = j.as || pluralize(j.repo.tableName);
          const getAttrs = attrs.map(attr => ` '${attr}', ${j.repo.tableName}.${attr}, `);
          const getObjectFields = j.attrs.map(attr => ` '${attr}', ${j.repo.tableName}.${attr} `);
          const getInnerJoins: string[] = j.join.map(
            iJ =>
              ` '${iJ.as || pluralize(iJ.repo.tableName)}', ${Repository.getJoins(
                j.join,
                j.repo as Repository,
              ).fields()} ` as string,
          );

          switch (j.type) {
            case 'many':
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
                )
              `;

            case 'single':
              return `
                JSON_OBJECT(
                  ${getObjectFields}
                ) AS ${getJoinName},
              `;

            default:
              throw new Error('Joins must always have a type');
          }
        });
      },
      joins: (): string | string[] => {
        if (join) {
          return join.map(j => {
            const getOn = j.on
              ? `ON ${Object.entries(j.on).map(
                  w => `\n${j.repo.tableName}.${w[0]} = ${upperRepository.tableName}.${w[1]}`,
                )}`
              : '';
            const getInnerJoins: string | string[] = j.join
              ? Repository.getJoins(j.join, j.repo as Repository).joins()
              : '';
            return `
              LEFT JOIN
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
