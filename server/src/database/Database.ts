import mysql, { ConnectionConfig, OkPacket } from 'mysql';
import Ramda from 'ramda';
import { promisify } from 'util';

import { databaseConfig } from '@config/database';

import { Logger } from '@helpers/Logger';

export class Database {
  private static instance: Database;
  private client: mysql.Connection;

  constructor(config: ConnectionConfig) {
    this.client = mysql.createConnection(config);
    this.connect();
    Logger.info('Database', 'ok');
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Database(databaseConfig as ConnectionConfig);
    }
    return this.instance;
  }

  private connect() {
    this.client.connect(err => {
      if (err) { throw err; }
    });
  }

  private disconnect() {
    this.client.end(err => {
      if (err) { throw err; }
    });
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

    Logger.info('Database:executing', formattedSql);

    const results = await this.raw<OkPacket>(formattedSql, params);

    return results;
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const formattedSql = this.formatSql(sql);

    Logger.info('Database:querying', formattedSql);

    const r = await this.raw<T[]>(formattedSql, params);

    function parseQueryResults(results: T[]) {
      return results.map((result: any) => {
        const fields = Object.entries(result);
        fields.forEach(([key, value]) => {
          try {
            // eslint-disable-next-line no-param-reassign
            result[key] = JSON.parse(value as string);
            if (result[key] instanceof Array) {
              // eslint-disable-next-line no-param-reassign
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
      .replace(/\[object Object]/g, '')
      .replace(/,\s*FROM/g, ' FROM')
      .replace(/\n/g, ' ')
      .replace(/,\s*,/g, ', ')
      .replace(/,\s*\)/g, ')')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s*,\s*/g, ', ')
      .replace(/'(.*)'\s*,\s*(JSON_OBJECT.+\))\s*(AS \1)\s*\)/g, "'$1', $2 )");
  }
}
