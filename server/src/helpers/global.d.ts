import Database from '../database/Database';
import User from '../app/models/User';

export {};

declare global {
  interface Context {
    db: Database;

    Users: User;

    Ok(body: any): HttpResponse;

    Created(body: any): HttpResponse;

    BadRequest(error?: string): HttpResponse;

    Unauthorized(error?: string): HttpResponse;

    NotFound(error?: string): HttpResponse;

    InternalError(error?: string): HttpResponse;
  }

  interface HttpRequest {
    body: object;
    query: {
      page?: number;
    };
    params: object;
  }

  interface HttpResponse {
    body: any;
    statusCode: number;
  }

  interface HttpError {
    message: string;
  }

  type ControllerRoute = (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
}
