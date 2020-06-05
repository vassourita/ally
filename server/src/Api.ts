import 'dotenv/config';
import cors from 'cors';
import Http from 'http';
import path from 'path';
import morgan from 'morgan';
import Youch from 'youch';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import Router from './Router';
import WebSocket from './WebSocket';

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
      console.log('\x1b[0mSOCKET: \x1b[34mok\x1b[0m');
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
    this.server.listen(port, () => console.log(`\x1b[0mSERVER: \x1b[34mhttp://localhost:${port}\x1b[0m`));
  }
}
