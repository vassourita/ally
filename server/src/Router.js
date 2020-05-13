import express from 'express';

import AuthMiddleware from './app/Middlewares/AuthMiddleware';
import SessionController from './app/Controllers/SessionController';
import EmployerController from './app/Controllers/EmployerController';

export default class Router {
  constructor() {
    const routes = express.Router();

    routes.post('/sessions', SessionController.store);
    routes.post('/employers', EmployerController.store);

    routes.use(AuthMiddleware.handle);

    this.routes = routes;
  }
}
