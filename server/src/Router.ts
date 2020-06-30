import express from 'express';

import { WebSocket } from '@root/WebSocket';

import { JobService } from '@services/JobService';
import { RepositoryService } from '@services/RepositoryService';
import { WebSocketService } from '@services/WebSocketService';

import { CurriculumController } from '@controllers/CurriculumController';
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

    const auth = new AuthMiddleware();
    const upload = new UploadMiddleware();

    const repoService = new RepositoryService();
    const jobService = new JobService(repoService);
    const wsService = new WebSocketService(WebSocket.getInstance());

    const user = new UserController(repoService);
    const report = new ReportController(repoService);
    const message = new MessageController(repoService, wsService);
    const session = new SessionController(repoService);
    const proposal = new ProposalController(repoService, wsService);
    const employer = new EmployerController(repoService);
    const curriculum = new CurriculumController(repoService);
    const jobVacancy = new JobVacancyController(repoService, jobService);
    const opportunity = new OpportunityController(repoService, jobService);
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

    routes.post('/curriculums', upload.single('file'), curriculum.store);
    routes.delete('/curriculums', curriculum.destroy);

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

    routes.get('/reports', report.index);
    routes.post('/reports', report.store);

    this.routes = routes;
  }
}
