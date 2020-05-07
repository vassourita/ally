import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

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

  static async show(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    const { id } = request.params;

    const user = await ctx.Users.findOne({
      where: { id },
    });

    if (user) {
      return ctx.Ok(user);
    }

    return ctx.NotFound('User does not exists');
  }
}
