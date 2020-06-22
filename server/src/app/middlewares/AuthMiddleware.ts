import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { authConfig } from '@config/auth';

export class AuthMiddleware {
  public async handle(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

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

    try {
      const payload = <any>jwt.verify(token, authConfig.secret as string);

      const userId = payload.id;
      res.locals.userId = userId;

      return next();
    } catch {
      return res.status(401).json({ error: { message: 'Token invalid' } });
    }
  }
}
