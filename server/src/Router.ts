import express from 'express';

import { RepositoryService } from '@services/RepositoryService';

import { EmployerController } from '@controllers/EmployerController';
import { JobVacancyController } from '@controllers/JobVacancyController';
import { MessageController } from '@controllers/MessageController';
import { NotificationController } from '@controllers/NotificationController';
import { OpportunityController } from '@controllers/OpportunityController';
import { ProposalController } from '@controllers/ProposalController';
import { ReportController } from '@controllers/ReportController';
import { SessionController } from '@controllers/SessionController';
import { UserController } from '@controllers/UserController';

import { AuthMiddleware } from '@middlewares/AuthMiddleware';
import { UploadMiddleware } from '@middlewares/UploadMiddleware';

import { SessionStoreValidator } from '@validators/SessionStoreValidator';

export class Router {
  public routes: express.Router;

  constructor() {
    const routes = express.Router({ caseSensitive: false });

    const upload = new UploadMiddleware();
    const auth = new AuthMiddleware();

    const repoService = new RepositoryService();

    const user = new UserController(repoService);
    const report = new ReportController(repoService);
    const message = new MessageController(repoService);
    const session = new SessionController(repoService);
    const proposal = new ProposalController(repoService);
    const employer = new EmployerController(repoService);
    const jobVacancy = new JobVacancyController(repoService);
    const opportunity = new OpportunityController(repoService);
    const notification = new NotificationController(repoService);

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
    routes.put('/proposals/:id', proposal.update);
    routes.delete('/proposals/:id', proposal.destroy);

    routes.get('/report', report.index);
    routes.post('/report', report.store);

    this.routes = routes;
  }
}
