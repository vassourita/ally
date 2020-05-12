import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

import ControllerBase from './ControllerBase';

export default class ProfileController extends ControllerBase {
  static async store(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    const { email, password } = request.body as any;

    const user = await ctx.Users.findOne({
      where: { email },
    });

    if (!user) {
      return ctx.NotFound('User not found', 'email');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return ctx.Unauthorized('Invalid password', 'password');
    }

    return ctx.Ok({
      user_id: user.id,
      token: jwt.sign({ id: user.id }, authConfig.secret as jwt.Secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
