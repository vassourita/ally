import { Request, Response } from 'express';
import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

type ControllerRoute = (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;

export default class RouterAdapter {
  private readonly ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  public adapt(controllerRoute: ControllerRoute) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        query: req.query,
        params: (req.params as unknown) as HttpRequest['params'],
        headers: req.headers as HttpRequest['headers'],
      };

      const httpResponse = await controllerRoute(httpRequest, this.ctx);

      return res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
