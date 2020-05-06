import { Request, Response } from 'express';
import Youch from 'youch';
import Context from '../../Context';

export default class RouterAdapter {
  static adapt(controllerRoute: ControllerRoute) {
    return async (req: Request, res: Response) => {
      try {
        const httpRequest = {
          body: req.body,
          query: req.query,
          params: req.params,
        };
        const httpResponse = await controllerRoute(httpRequest, Context);
        return res.status(httpResponse.statusCode).json(httpResponse.body);
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          const error = await new Youch(e, req).toJSON();
          return res.status(500).json({ message: error });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  }
}
