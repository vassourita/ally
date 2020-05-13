import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default class AuthMiddleware {
  static async handle(req, res, next) {
    const auth = req.headers.Authorization;

    if (!auth) {
      return res.status(401).json({ error: { message: 'No token provided' } });
    }

    const parts = auth.split(' ');
    if (!(parts.length === 2)) {
      return res.status(401).json({ error: { message: 'Token error' } });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: { message: 'Token malformatted' } });
    }

    const promiseVerify = promisify(jwt.verify);

    try {
      const decoded = await promiseVerify(token, authConfig.secret);

      const userId = decoded.id;
      req.userId = userId;

      return next();
    } catch {
      return res.status(401).json({ error: { message: 'Token invalid' } });
    }
  }
}
