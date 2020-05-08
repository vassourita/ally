import Repository from './database/Repository';
import UserRepository from './app/repositories/UserRepository';
import JobVacancyRepository from './app/repositories/JobVacancyRepository';
import RatingRepository from './app/repositories/RatingRepository';
import HttpResponse from './protocols/HttpResponse';
import Database from './database/Database';

export default class Context {
  private readonly db: Database;

  public Users: Repository = new UserRepository(this.db);
  public Ratings: Repository = new RatingRepository(this.db);
  public JobVacancies: Repository = new JobVacancyRepository(this.db);

  constructor(db: Database) {
    this.db = db;
  }

  public Ok(body: any): HttpResponse {
    return {
      statusCode: 200,
      body,
    };
  }

  public Created(body: any): HttpResponse {
    return {
      statusCode: 201,
      body,
    };
  }

  public BadRequest(error = 'Invalid request syntax'): HttpResponse {
    return {
      statusCode: 400,
      body: {
        message: error,
      },
    };
  }

  public Unauthorized(error = 'Operation not authorized'): HttpResponse {
    return {
      statusCode: 401,
      body: {
        message: error,
      },
    };
  }

  public NotFound(error = 'Resource not found'): HttpResponse {
    return {
      statusCode: 404,
      body: {
        message: error,
      },
    };
  }

  public InternalError(error = 'Internal server error'): HttpResponse {
    return {
      statusCode: 500,
      body: {
        message: error,
      },
    };
  }

  public NotImplemented(error = 'Method not implemented'): HttpResponse {
    return {
      statusCode: 501,
      body: {
        message: error,
      },
    };
  }
}
