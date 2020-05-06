/* eslint-disable arrow-body-style */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
import pluralize from 'pluralize';

import Database from './Database';
import AllySqlModelPrimaryKeyError from '../helpers/errors/AllySqlModelPrimaryKeyError';
import Context from '../Context';

export default class Model {
  private db: Database;
  public tableName: string;
  public tableSchema: allySql.ISchema;
  public fields: string[];
  public primaryFields: string[];
  public requiredFields: string[];
  public returnFields: string[];

  constructor(tableName: string, tableSchema: allySql.ISchema) {
    this.db = Context.db;
    this.tableName = tableName;
    this.tableSchema = tableSchema;

    const keys = Object.keys(tableSchema);
    const values = Object.values(tableSchema);

    this.fields = keys;
    this.primaryFields = keys.filter((k, i) => values[i].primary || false);
    this.requiredFields = keys.filter((k, i) => values[i].required || false);
    this.returnFields = keys.filter((k, i) => values[i].returning || true);

    if (this.primaryFields.length < 1) {
      throw new AllySqlModelPrimaryKeyError();
    }
  }

  async find(query: allySql.IQuery): Promise<any> {
    const { attrs = this.returnFields, limit = null, offset = 0, where, join = [] } = query;

    const formattedWhere = Object.entries(where as object);

    const getSelect = attrs.map(a => ` ${this.tableName}.${a} `);
    const getWhere = formattedWhere
      ? `WHERE ${formattedWhere.map(w => `\n${this.tableName}.${w[0]} = ${Database.escape(w[1])}`)}`
      : '';
    const getGroupBy = join.length ? ` GROUP BY ${this.tableName}.${this.primaryFields[0]} ` : '';
    const getLimit = limit ? ` LIMIT ${limit} ` : '';
    const getOffset = offset ? ` OFFSET ${offset} ` : '';

    const sql = `
      SELECT ${getSelect}
      ,${Model.getJoins(join, this).fields()}
      FROM ${this.tableName}
      ${Model.getJoins(join, this).joins()}
      ${getWhere}
      ${getGroupBy}
      ${getLimit}
      ${getOffset}
    `;

    this.db.query(sql, []);

    return {};
  }

  static getJoins(join: allySql.IJoin[], upperModel: Model) {
    return {
      fields: (): string | string[] => {
        return join.map(j => {
          const attrs = j.attrs || j.model.returnFields;
          const getJoinName = j.as || pluralize(j.model.tableName);
          const getAttrs = attrs.map(attr => ` '${attr}', ${j.model.tableName}.${attr}, `);
          const getObjectFields = j.attrs.map(attr => ` '${attr}', ${j.model.tableName}.${attr} `);
          const getInnerJoins: string[] = j.join.map(
            iJ =>
              ` '${iJ.as || pluralize(iJ.model.tableName)}', ${Model.getJoins(
                j.join,
                j.model as Model,
              ).fields()} ` as string,
          );

          switch (j.type) {
            case 'many':
              return `
                IF(
                  ${j.model.tableName}.${j.model.primaryFields[0]} IS NULL,
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
                  w => `\n${j.model.tableName}.${w[0]} = ${upperModel.tableName}.${w[1]}`,
                )}`
              : '';
            const getInnerJoins: string | string[] = j.join ? Model.getJoins(j.join, j.model as Model).joins() : '';
            return `
              LEFT JOIN
                ${j.model.tableName} 
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
