import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import path from 'path';
import morgan from 'morgan';
import Youch from 'youch';
import express from 'express';
import 'express-async-errors';

import Router from './Router';

export default class AllyApi {
  constructor() {
    this.app = express();
    this.app.disable('x-powered-by');

    this.server = http.createServer(this.app);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'public', 'uploads')));
  }

  routes() {
    this.app.use(new Router().routes);
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, _next) => {
      if (process.env.NODE_ENV === 'development') {
        const error = await new Youch(err, req).toJSON();

        return res.status(500).json({ error });
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }

  listen(port = process.env.PORT) {
    this.server.listen(port, () => console.log(`\x1b[0mSERVER: \x1b[34mhttp://localhost:${port}\x1b[0m`));
  }
}
