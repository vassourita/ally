import ControllerBase from './ControllerBase';

export default class UserController extends ControllerBase {
  static async index(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    const { page = 1 } = request.query;

    const users = await ctx.Users.find({
      limit: 10,
      offset: (page - 1) * 10,
    });

    return ctx.Ok(users);
  }
}
