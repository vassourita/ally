import express from 'express';

import AuthMiddleware from './app/Middlewares/AuthMiddleware';
import UploadMiddleware from './app/Middlewares/UploadMiddleware';

import SessionStoreValidator from './app/Validators/SessionStoreValidator';

import UserController from './app/Controllers/UserController';
import ProfileController from './app/Controllers/ProfileController';
import SessionController from './app/Controllers/SessionController';
import EmployerController from './app/Controllers/EmployerController';
import JobVacancyController from './app/Controllers/JobVacancyController';

export default class Router {
  constructor() {
    const routes = express.Router();

    routes.get('/profiles/:id', ProfileController.show);
    routes.post('/sessions', SessionStoreValidator.validate, SessionController.store);
    routes.post('/employers', UploadMiddleware.single('image'), EmployerController.store);

    routes.use(AuthMiddleware.handle);

    routes.delete('/users', UserController.destroy);

    routes.delete('/employers', EmployerController.destroy);

    routes.get('/jobs', JobVacancyController.index);
    routes.get('/jobs/:jobId', JobVacancyController.show);

    this.routes = routes;
  }
}
