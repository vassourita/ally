import Database from '../database/Database';

export {};

declare global {
  interface Context {
    db: Database;
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
