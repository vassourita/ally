import { ConnectionConfig } from 'mysql';

import AllyApi from './Api';
import Database from './database/Database';
import dbConfig from './config/database';

const database = new Database(dbConfig as ConnectionConfig);

const api = new AllyApi(database);

api.listen(3333);
