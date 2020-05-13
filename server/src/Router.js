import express from 'express';

import AuthMiddleware from './app/Middlewares/AuthMiddleware';
import UploadMiddleware from './app/Middlewares/UploadMiddleware';

import SessionStoreValidator from './app/Validators/SessionStoreValidator';

import SessionController from './app/Controllers/SessionController';
import EmployerController from './app/Controllers/EmployerController';

export default class Router {
  constructor() {
    const routes = express.Router();

    routes.post('/employers', UploadMiddleware.single('file'), EmployerController.store);
    routes.post('/sessions', SessionStoreValidator.validate, SessionController.store);

    routes.use(AuthMiddleware.handle);

    this.routes = routes;
  }
}
