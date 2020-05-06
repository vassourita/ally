import ControllerBase from './ControllerBase';

export default class UserController extends ControllerBase {
  static async index(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    const users = ctx.Users.find();

    return ctx.Ok(users);
  }
}
