export default class UserController {
  static async index(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    return ctx.Ok({});
  }
}
