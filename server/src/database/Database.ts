/* eslint-disable no-param-reassign */
import mysql, { ConnectionConfig, OkPacket } from 'mysql';
import { promisify } from 'util';
import Ramda from 'ramda';

import dbConfig from '../config/database';

export default class Database {
  private static instance: Database;
  private client: mysql.Connection;

  constructor(config: ConnectionConfig) {
    this.client = mysql.createConnection(config);
    this.connect();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Database(dbConfig as ConnectionConfig);
    }
    return this.instance;
  }

  private connect() {
    this.client.connect(err => {
      if (err) throw err;
      console.log('\x1b[0mDATABASE: \x1b[34mok\x1b[0m');
    });
    this.raw("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))");
  }

  public static escape<T>(value: T) {
    return mysql.escape(value);
  }

  public async raw<T>(sql: string, params: any[] = []): Promise<T> {
    const res = await promisify<string, any[], T>(this.client.query).bind(this.client)(sql, params);
    return res;
  }

  public async execute(sql: string, params: any[] = []): Promise<OkPacket> {
    const formattedSql = this.formatSql(sql);

    console.log(`\x1b[36m${formattedSql}\x1b[0m`);

    const results = await this.raw<OkPacket>(formattedSql, params);

    return results;
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const formattedSql = this.formatSql(sql);

    console.log(`\x1b[36m${formattedSql}\x1b[0m`);

    const r = await this.raw<T[]>(formattedSql, params);

    function parseQueryResults(results: T[]) {
      return results.map((result: any) => {
        const fields = Object.entries(result);
        fields.forEach(([key, value]) => {
          try {
            result[key] = JSON.parse(value as string);
            if (result[key] instanceof Array) {
              result[key] = Ramda.uniqWith(Ramda.equals, result[key]);
            }
          } catch {
            //
          }
        });
        return result;
      });
    }

    return parseQueryResults(r);
  }

  private formatSql(sql: string) {
    return sql
      .trim()
      .replace(/,\s*LEFT JOIN/g, ' LEFT JOIN')
      .replace(/,\s*RIGHT JOIN/g, ' RIGHT JOIN')
      .replace(/,\s*INNER JOIN/g, ' INNER JOIN')
      .replace(/undefined/g, '')
      .replace(/,\s*FROM/g, ' FROM')
      .replace(/\n/g, ' ')
      .replace(/,\s*,/g, ', ')
      .replace(/,\s*\)/g, ')')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s*,\s*/g, ', ')
      .replace(/'(.*)'\s*,\s*(JSON_OBJECT.+\))\s*(AS \1)\s*\)/g, "'$1', $2 )");
  }
}
