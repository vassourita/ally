export {};

declare global {
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

  type ControllerRoute = (request: HttpRequest) => Promise<HttpResponse>;
}
