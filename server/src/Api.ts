import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import Http from 'http';
import morgan from 'morgan';
import path from 'path';
import Youch from 'youch';
import 'express-async-errors';

import Router from '@root/Router';
import WebSocket from '@root/WebSocket';

import Logger from '@helpers/Logger';

export default class AllyApi {
  private app: express.Application;
  private server: Http.Server;

  constructor() {
    this.app = express();
    this.app.disable('x-powered-by');

    this.server = Http.createServer(this.app);

    this.middlewares();
    this.setupWebSocket();
    this.routes();
    this.exceptionHandler();
  }

  private setupWebSocket() {
    WebSocket.getInstance().setup(this.server, (err: Error) => {
      if (err) throw err;
      Logger.info('Socket ok');
    });
  }

  private middlewares() {
    this.app.set('base', '/v1');
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'public', 'uploads')));
  }

  private routes() {
    this.app.use('/v1', new Router().routes);
  }

  private exceptionHandler() {
    this.app.use(async (err: Error, req: Request, res: Response, _next: NextFunction) => {
      if (process.env.NODE_ENV === 'development') {
        const error = await new Youch(err, req).toJSON();

        return res.status(500).json({ error });
      }

      return res.status(500).json({ error: { message: 'Internal server error' } });
    });
  }

  public listen(port: string | number | undefined = process.env.PORT) {
    this.server.listen(port, () =>
      Logger.info('Server ok'));
  }
}
