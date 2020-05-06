import Context from '../../Context';

export default class UserController {
  static async index(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {
        message: 'Ok!',
        ctx,
      },
    };
  }
}
