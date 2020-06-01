import express from 'express';

import AuthMiddleware from './app/middlewares/AuthMiddleware';
import UploadMiddleware from './app/middlewares/UploadMiddleware';

import SessionStoreValidator from './app/validators/SessionStoreValidator';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MessageController from './app/controllers/MessageController';
import ProposalController from './app/controllers/ProposalController';
import EmployerController from './app/controllers/EmployerController';
import JobVacancyController from './app/controllers/JobVacancyController';
import OpportunityController from './app/controllers/OpportunityController';
import NotificationController from './app/controllers/NotificationController';

export default class Router {
  constructor() {
    const routes = express.Router({ caseSensitive: false });

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

    routes.get('/notifications', NotificationController.index);
    routes.put('/notifications/:id', NotificationController.update);

    routes.get('/messages', MessageController.index);
    routes.post('/messages', MessageController.store);

    routes.post('/proposals', ProposalController.store);
    routes.put('/proposals', ProposalController.update);

    this.routes = routes;
  }
}
