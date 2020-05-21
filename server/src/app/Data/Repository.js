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
    this.returnFields = keys.filter((k, i) => values[i].returning || true);

    if (this.primaryFields.length < 1) {
      throw new AllySqlRepositoryPrimaryKeyError();
    }
  }

  async find({ attrs = this.returnFields, limit = null, offset = 0, where = {}, join = [] } = {}) {
    const formattedWhere = Object.entries(where);

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

  async findOne(query) {
    const results = await this.find({ ...query, limit: 1 });
    return results[0] || null;
  }

  async delete({ where }) {
    const formattedWhere = Object.entries(where);
    const sql = `
      DELETE FROM ${this.tableName}
      WHERE ${formattedWhere.map(w => `\n${this.tableName}.${w[0]} = ${Database.escape(w[1])}`)}
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
          const getObjectFields = j.attrs.map(attr => ` '${attr}', ${j.repo.tableName}.${attr} `);
          const getInnerJoins = j.join.map(
            iJ => ` '${iJ.as || pluralize(iJ.repo.tableName)}', ${Repository.getJoins(j.join, j.repo).fields()} `,
          );

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
                ) ${getJoinName},
              )
            `;
          }
          if (j.type === 'single') {
            return `
              JSON_OBJECT(
                ${getObjectFields}
              ) ${getJoinName},
            `;
          }

          throw new AllySqlJoinTypeError();
        });
      },
      joins() {
        if (join) {
          return join.map(j => {
            const getOn = j.on
              ? `ON ${Object.entries(j.on).map(
                  w => `\n${j.repo.tableName}.${w[0]} = ${upperRepository.tableName}.${w[1]}`,
                )}`
              : '';
            const getInnerJoins = j.join ? Repository.getJoins(j.join, j.repo).joins() : '';
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
