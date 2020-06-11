import 'dotenv/config';
import { Config } from 'knex';

interface KnexFileConfig {
  development?: Config;
  production?: Config;
  staging?: Config;
}

const config: KnexFileConfig = {
  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/seeds`,
    },
  },
};

module.exports = config;
