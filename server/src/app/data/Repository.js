/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import pluralize from 'pluralize';

import Database from './Database';
import AllySqlRepositoryPrimaryKeyError from '../../helpers/errors/AllySqlRepositoryPrimaryKeyError';
import AllySqlJoinTypeError from '../../helpers/errors/AllySqlJoinTypeError';

export default class Repository {
  constructor(tableName, tableSchema) {
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

  /**
   *
   * @param {{
      attrs: string[],
      limit: number,
      offset: number,
      where: {
        [field: string]: string
      },
      join: [{
        repo: Repository,
        on: {
          [field: string]: string
        },
        attrs: string[],
        as: string,
        type: "many" | "single" | "count",
        side: "LEFT"| "RIGHT" | "INNER",
        join: [{
          repo: Repository,
          on: {
            [field: string]: string
          },
          attrs: string[],
          as: string,
          type: "many" | "single" | "count",
          side: "LEFT"| "RIGHT" | "INNER"
          join: []
        }]
      }]
     }} query
     @returns {[]}
   */
  async find(query = {}) {
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

    const results = this.db.query(sql, []);

    return results;
  }
  /**
   *
   * @param {{
    attrs: string[],
    offset: number,
    where: {
      [field: string]: string
    },
    join: [{
      repo: Repository,
      on: {
        [field: string]: string
      },
      attrs: string[],
      as: string,
      type: "many" | "single" | "count",
      side: "LEFT"| "RIGHT" | "INNER",
      join: [{
        repo: Repository,
        on: {
          [field: string]: string
        },
        attrs: string[],
        as: string,
        type: "many" | "single" | "count",
        side: "LEFT"| "RIGHT" | "INNER"
        join: []
      }]
    }]
  }} query
  */
  async findOne(query) {
    const results = await this.find({ ...query, limit: 1 });
    return results[0] || null;
  }

  async delete({ where, operator = '=' }) {
    const formattedWhere = Object.entries(where);
    const sql = `
      DELETE FROM ${this.tableName}
      WHERE ${formattedWhere
        .map(([key, value]) => `\n${this.tableName}.${key} ${operator} ${Database.escape(value)}`)
        .join(' AND ')}
    `;
    const rows = await this.db.query(sql, []);
    return rows.affectedRows;
  }

  async update({ where, operator = '=', set }) {
    const formattedWhere = Object.entries(where);
    const formattedSet = Object.entries(set);
    const sql = `
      UPDATE ${this.tableName}
      SET ${formattedSet.map(([key, value]) => ` ${this.tableName}.${key} = ${Database.escape(value)} `)}
      WHERE ${formattedWhere
        .map(([key, value]) => ` ${this.tableName}.${key} ${operator} ${Database.escape(value)} `)
        .join(' AND ')}
    `;
    const rows = await this.db.query(sql, []);
    return rows.affectedRows;
  }

  async create(schema, returning = true) {
    const sql = `
      INSERT INTO ${this.tableName}
        (${Object.keys(schema)})
        VALUES
        (${Database.escape(Object.values(schema))});
    `;
    const { insertId } = await this.db.query(sql, []);

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

  static getJoins(join, upperRepository) {
    return {
      fields() {
        return join.map(j => {
          const attrs = j.attrs || j.repo.returnFields;
          const getJoinName = j.as || pluralize(j.repo.tableName);
          const getAttrs = attrs.map(attr => ` '${attr}', ${j.repo.tableName}.${attr}, `);
          const getObjectFields = attrs.map(attr => ` '${attr}', ${j.repo.tableName}.${attr} `);
          const getInnerJoins = j.join
            ? j.join.map(
                iJ => ` '${iJ.as || pluralize(iJ.repo.tableName)}', ${Repository.getJoins(j.join, j.repo).fields()} `,
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
      joins() {
        if (join) {
          return join.map(j => {
            const getOn =
              j.on && `ON ${Object.entries(j.on).map(w => `\n${j.repo.tableName}.${w[0]} ${join.op || '='} ${w[1]}`)}`;

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
