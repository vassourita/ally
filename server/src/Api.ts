import 'dotenv/config';
import http from 'http';
import cors from 'cors';
import Youch from 'youch';
import express, { Request, NextFunction, Response } from 'express';
import 'express-async-errors';

import Router from './Router';
import Database from './database/Database';

export default class AllyApi {
  private server: http.Server;
  private app: express.Application;

  constructor(private readonly db: Database) {
    this.app = express();
    this.app.disable('x-powered-by');

    this.server = http.createServer(this.app);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    const router = new Router(this.db);
    this.app.use(router.routes);
  }

  private exceptionHandler() {
    this.app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json({ errors });
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }

  public listen(port: number = Number(process.env.PORT)) {
    console.log(`\x1b[0mSERVER: \x1b[34mhttp://localhost:${port}\x1b[0m`);
    this.server.listen(port);
  }
}
