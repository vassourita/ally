import mysql from 'mysql';
import { promisify } from 'util';

import dbConfig from '../../config/database';

export default class Database {
  constructor(config) {
    this.client = mysql.createConnection(config);
    this.connect();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database(dbConfig);
    }
    return this.instance;
  }

  connect() {
    this.client.connect(err => {
      if (err) throw err;
      console.log('\x1b[0mDATABASE: \x1b[34mok\x1b[0m');
    });
  }

  static escape(value) {
    return mysql.escape(value);
  }

  async raw(sql, params) {
    const res = await promisify(this.client.query).bind(this.client)(sql, params);
    return res;
  }

  async query(sql, params = []) {
    const fSql = sql
      .trim()
      .replace(/(=.*),/g, '$1 AND ')
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

    console.log(`\x1b[36m${fSql}\x1b[0m`);

    const r = await promisify(this.client.query).bind(this.client)(fSql, params);

    function parseQueryResults(res) {
      return res.map((result, i) => {
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
      return parseQueryResults(r);
    }
    return r;
  }
}
