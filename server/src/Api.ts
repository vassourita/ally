import 'dotenv/config';
import http from 'http';
import cors from 'cors';
import express from 'express';

import routes from './routes';

export default class AllyApi {
  private server: http.Server;
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.disable('x-powered-by');

    this.server = http.createServer(this.app);

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(routes);
  }

  public listen(port: number = Number(process.env.PORT)) {
    console.log(`\x1b[0mSERVER: \x1b[34mhttp://localhost:${port}\x1b[0m`);
    this.server.listen(port);
  }
}
