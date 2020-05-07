import Model from './database/Model';
import User from './app/models/User';
import JobVacancy from './app/models/JobVacancy';
import Rating from './app/models/Rating';
import HttpResponse from './protocols/HttpResponse';

export default class Context {
  public Users: Model = new User();
  public Ratings: Model = new Rating();
  public JobVacancies: Model = new JobVacancy();

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
}
