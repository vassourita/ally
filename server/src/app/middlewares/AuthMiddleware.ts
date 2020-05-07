import jwt, { Secret } from 'jsonwebtoken';
import { promisify } from 'util';

import MiddlewareBase from './MiddlewareBase';
import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

import authConfig from '../../config/auth';

export default class AuthMiddleware extends MiddlewareBase {
  public async handle(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    const auth = request.headers.authorization;
    if (!auth) {
      return ctx.Unauthorized('No token provided');
    }

    const parts = auth.split(' ');
    if (!(parts.length === 2)) {
      return ctx.Unauthorized('Token error');
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return ctx.Unauthorized('Token malformatted');
    }

    const promiseVerify = promisify(jwt.verify);

    try {
      const decoded = (await promiseVerify(token, authConfig.secret as Secret)) as { id: number };

      const userId = decoded.id;

      const user = await ctx.Users.findOne({
        where: { id: userId },
      });

      return ctx.Ok(user);
    } catch {
      return ctx.Unauthorized('Token invalid');
    }
  }
}
