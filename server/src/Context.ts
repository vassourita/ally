import { ConnectionConfig } from 'mysql';

import Database from './database/Database';
import dbConfig from './config/database';
import User from './app/models/User';

export default class Context {
  static db = new Database(dbConfig as ConnectionConfig);

  static Users = new User();

  public static Ok(body: any): HttpResponse {
    return {
      statusCode: 200,
      body,
    };
  }

  public static Created(body: any): HttpResponse {
    return {
      statusCode: 201,
      body,
    };
  }

  public static BadRequest(error = 'Invalid request syntax'): HttpResponse {
    return {
      statusCode: 400,
      body: {
        message: error,
      },
    };
  }

  public static Unauthorized(error = 'Operation not authorized'): HttpResponse {
    return {
      statusCode: 401,
      body: {
        message: error,
      },
    };
  }

  public static NotFound(error = 'Resource not found'): HttpResponse {
    return {
      statusCode: 404,
      body: {
        message: error,
      },
    };
  }

  public static InternalError(error = 'Internal server error'): HttpResponse {
    return {
      statusCode: 500,
      body: {
        message: error,
      },
    };
  }
}
