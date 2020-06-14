import express from 'express';

import AuthMiddleware from './app/middlewares/AuthMiddleware';
import UploadMiddleware from './app/middlewares/UploadMiddleware';

import SessionStoreValidator from './app/validators/SessionStoreValidator';

import UserController from './app/controllers/UserController';
import ReportController from './app/controllers/ReportController';
import SessionController from './app/controllers/SessionController';
import MessageController from './app/controllers/MessageController';
import ProposalController from './app/controllers/ProposalController';
import EmployerController from './app/controllers/EmployerController';
import JobVacancyController from './app/controllers/JobVacancyController';
import OpportunityController from './app/controllers/OpportunityController';
import NotificationController from './app/controllers/NotificationController';

export default class Router {
  public routes: express.Router;

  constructor() {
    const routes = express.Router({ caseSensitive: false });

    const upload = new UploadMiddleware();
    const auth = new AuthMiddleware();

    const user = new UserController();
    const report = new ReportController();
    const message = new MessageController();
    const session = new SessionController();
    const proposal = new ProposalController();
    const employer = new EmployerController();
    const jobVacancy = new JobVacancyController();
    const opportunity = new OpportunityController();
    const notification = new NotificationController();

    routes.post('/sessions', new SessionStoreValidator().validate, session.store);

    routes.post('/users', upload.single('image'), user.store);
    routes.post('/employers', upload.single('image'), employer.store);

    routes.use(auth.handle);

    routes.get('/employers', employer.index);
    routes.get('/employers/:id', employer.show);
    routes.put('/employers', employer.update);
    routes.delete('/employers/:id', employer.destroy);

    routes.get('/users', user.index);
    routes.get('/users/:id', user.show);
    routes.put('/users', user.update);
    routes.delete('/users/:id', user.destroy);

    routes.get('/jobs', jobVacancy.index);
    routes.get('/jobs/:id', jobVacancy.show);
    routes.post('/jobs', jobVacancy.store);
    routes.put('/jobs/:id', jobVacancy.update);
    routes.delete('/jobs/:id', jobVacancy.destroy);

    routes.get('/opportunities', opportunity.index);

    routes.get('/notifications', notification.index);
    routes.put('/notifications/:id', notification.update);

    routes.get('/messages', message.index);
    routes.post('/messages', message.store);

    routes.get('/proposals', proposal.index);
    routes.post('/proposals', proposal.store);
    routes.put('/proposals', proposal.update);
    routes.delete('/proposals', proposal.destroy);

    routes.get('/report', report.index);
    routes.post('/report', report.store);

    this.routes = routes;
  }
}
