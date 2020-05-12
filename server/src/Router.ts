import express from 'express';

import RouterAdapter from './helpers/adapters/RouterAdapter';
import MiddlewareAdapter from './helpers/adapters/MiddlewareAdapter';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import AuthMiddleware from './app/middlewares/AuthMiddleware';
import Database from './database/Database';
import Context from './Context';

export default class Router {
  public routes = express.Router();
  private routerAdapter: RouterAdapter;
  private readonly ctx: Context;

  constructor(private readonly db: Database) {
    this.ctx = new Context(this.db);
    this.routerAdapter = new RouterAdapter(this.ctx);

    // routes
    this.routes.post('/users', this.routerAdapter.adapt(UserController.store));
    this.routes.post('/sessions', this.routerAdapter.adapt(SessionController.store));

    this.routes.use(new MiddlewareAdapter(this.ctx).adapt(new AuthMiddleware()));
  }
}
