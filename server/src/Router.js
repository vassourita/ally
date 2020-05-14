import express from 'express';

import AuthMiddleware from './app/Middlewares/AuthMiddleware';
import UploadMiddleware from './app/Middlewares/UploadMiddleware';

import SessionStoreValidator from './app/Validators/SessionStoreValidator';

import SessionController from './app/Controllers/SessionController';
import EmployerController from './app/Controllers/EmployerController';
import ProfileController from './app/Controllers/ProfileController';

export default class Router {
  constructor() {
    const routes = express.Router();

    routes.post('/sessions', SessionStoreValidator.validate, SessionController.store);
    routes.post('/employers', UploadMiddleware.single('image'), EmployerController.store);

    routes.use(AuthMiddleware.handle);

    routes.delete('/employers', EmployerController.destroy);
    routes.get('/employers', EmployerController.show);

    this.routes = routes;
  }
}
