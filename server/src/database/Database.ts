import mysql from 'mysql';
import { promisify } from 'util';

export default class Database {
  private client: mysql.Connection;

  constructor(config: string | mysql.ConnectionConfig) {
    this.client = mysql.createConnection(config);
    this.connect();
  }

  public connect() {
    this.client.connect((err: Error) => {
      if (err) throw err;
      console.log('\x1b[0mDATABASE: \x1b[34mok\x1b[0m');
    });
    this.client.query("SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));");
  }

  public static escape<T>(value: T): string {
    return mysql.escape(value);
  }

  public async raw(sql: string, params: any[]): Promise<any> {
    const res = await promisify<string, any[]>(this.client.query).bind(this.client)(sql, params);
    return res;
  }

  public async query<T>(sql: string, params: any[]): Promise<T | T[]> {
    const fSql = sql
      .trim()
      .replace(/(=.*),/g, '$1 AND ')
      .replace(/,\s*LEFT JOIN/g, ' LEFT JOIN')
      .replace(/,\s*FROM/g, ' FROM')
      .replace(/\n/g, ' ')
      .replace(/,\s*,/g, ', ')
      .replace(/,\s*\)/g, ')')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s*,\s*/g, ', ')
      .replace(/'(.*)'\s*,\s*(JSON_OBJECT.+\))\s*(AS \1)\s*\)/g, "'$1', $2 )");

    console.log(`\x1b[36m${fSql}\x1b[0m`);

    const r = await promisify<string, any[], T>(this.client.query).bind(this.client)(fSql, params);

    function parseQueryResults(res: any[]) {
      return res.map((result: object, i: number) => {
        const fields = Object.entries(result);
        fields.forEach(f => {
          try {
            res[i][f[0]] = JSON.parse(f[1]);
          } catch {
            //
          }
        });
        return res[i];
      });
    }

    if (r instanceof Array) {
      return parseQueryResults(r) as T[];
    }
    return r;
  }
}
