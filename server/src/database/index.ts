import { ConnectionConfig } from 'mysql';
import dbConfig from '../config/database';
import Database from './Database';

export default new Database(dbConfig as ConnectionConfig);
