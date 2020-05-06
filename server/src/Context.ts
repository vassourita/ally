import { ConnectionConfig } from 'mysql';

import dbConfig from './config/database';
import Database from './database/Database';
import Model from './database/Model';
import User from './app/models/User';
import JobVacancy from './app/models/JobVacancy';
import Rating from './app/models/Rating';

export default class Context {
  public static db: Database = new Database(dbConfig as ConnectionConfig);

  public static Users: Model = new User();
  public static Ratings: Model = new Rating();
  public static JobVacancies: Model = new JobVacancy();

  public static Ok<T>(body: T): HttpResponse {
    return {
      statusCode: 200,
      body,
    };
  }

  public static Created<T>(body: T): HttpResponse {
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
