import express from 'express';

import RouterAdapter from './helpers/adapters/RouterAdapter';
import MiddlewareAdapter from './helpers/adapters/MiddlewareAdapter';

import UserController from './app/controllers/UserController';

import AuthMiddleware from './app/middlewares/AuthMiddleware';
import Database from './database/Database';
import Context from './Context';

export default class Router {
  public routes = express.Router();
  private readonly ctx: Context;

  constructor(private readonly db: Database) {
    this.ctx = new Context(this.db);

    this.routes.get('/users', new RouterAdapter(this.ctx).adapt(UserController.index));
    this.routes.get('/users/:id', new RouterAdapter(this.ctx).adapt(UserController.show));

    this.routes.use(new MiddlewareAdapter(this.ctx).adapt(new AuthMiddleware()));
  }
}
