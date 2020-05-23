import express from 'express';

import AuthMiddleware from './app/Middlewares/AuthMiddleware';
import UploadMiddleware from './app/Middlewares/UploadMiddleware';

import SessionStoreValidator from './app/Validators/SessionStoreValidator';

import UserController from './app/Controllers/UserController';
import SessionController from './app/Controllers/SessionController';
import EmployerController from './app/Controllers/EmployerController';
import JobVacancyController from './app/Controllers/JobVacancyController';
import OpportunityController from './app/Controllers/OpportunityController';

export default class Router {
  constructor() {
    const routes = express.Router();

    routes.post('/sessions', SessionStoreValidator.validate, SessionController.store);

    routes.post('/users', UploadMiddleware.single('image'), UserController.store);
    routes.post('/employers', UploadMiddleware.single('image'), EmployerController.store);

    routes.use(AuthMiddleware.handle);

    routes.get('/employers', EmployerController.index);
    routes.get('/employers/:id', EmployerController.show);
    routes.put('/employers', EmployerController.update);
    routes.delete('/employers/:id', EmployerController.show);

    routes.get('/users', UserController.index);
    routes.get('/users/:id', UserController.show);
    routes.put('/users', UserController.update);
    routes.delete('/users/:id', UserController.destroy);

    routes.get('/jobs', JobVacancyController.index);
    routes.get('/jobs/:id', JobVacancyController.show);
    routes.post('/jobs', JobVacancyController.store);
    routes.put('/jobs/:id', JobVacancyController.update);
    routes.delete('/jobs/:id', JobVacancyController.destroy);

    routes.get('/opportunities', OpportunityController.index);

    this.routes = routes;
  }
}
