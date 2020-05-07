import express from 'express';

import RouterAdapter from './helpers/adapters/RouterAdapter';
import MiddlewareAdapter from './helpers/adapters/MiddlewareAdapter';

import UserController from './app/controllers/UserController';

import AuthMiddleware from './app/middlewares/AuthMiddleware';

export default class Router {
  public routes = express.Router();

  constructor() {
    this.routes.get('/users', RouterAdapter.adapt(UserController.index));
    this.routes.get('/users/:id', RouterAdapter.adapt(UserController.show));

    this.routes.use(MiddlewareAdapter.adapt(new AuthMiddleware()));
  }
}
