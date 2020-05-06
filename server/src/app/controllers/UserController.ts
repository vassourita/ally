export default class UserController {
  static async index(request: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {
        message: 'Ok!',
        query: request.query,
      },
    };
  }
}
