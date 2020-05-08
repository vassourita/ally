import { Request, Response, NextFunction } from 'express';

import MiddlewareBase from '../../app/middlewares/MiddlewareBase';
import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';

export default class MiddlewareAdapter {
  private readonly ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  public adapt<T extends MiddlewareBase>(middleware: T) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        query: req.query,
        params: (req.params as unknown) as HttpRequest['params'],
        headers: req.headers as HttpRequest['headers'],
      };

      const httpResponse = await middleware.handle(httpRequest, this.ctx);

      if (httpResponse.statusCode !== 200) {
        return res.status(httpResponse.statusCode).json(httpResponse.body);
      }

      Object.assign(req, httpResponse.body);

      return next();
    };
  }
}
