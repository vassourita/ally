import { Chat } from '@models/Chat';
import { JobVacancy } from '@models/JobVacancy';
import { Knowledge } from '@models/Knowledge';
import { KnowledgeType } from '@models/KnowledgeType';
import { Message } from '@models/Message';
import { Notification } from '@models/Notification';
import { Proposal } from '@models/Proposal';
import { Report } from '@models/Report';
import { User } from '@models/User';
import { UserType } from '@models/UserType';

import { BaseRepository } from '@repositories/BaseRepository';
import { ChatRepository } from '@repositories/ChatRepository';
import { JobVacancyRepository } from '@repositories/JobVacancyRepository';
import { KnowledgeRepository } from '@repositories/KnowledgeRepository';
import { KnowledgeTypeRepository } from '@repositories/KnowledgeTypeRepository';
import { MessageRepository } from '@repositories/MessageRepository';
import { NotificationRepository } from '@repositories/NotificationRepository';
import { ProposalRepository } from '@repositories/ProposalRepository';
import { ReportRepository } from '@repositories/ReportRepository';
import { UserRepository } from '@repositories/UserRepository';
import { UserTypeRepository } from '@repositories/UserTypeRepository';

export class RepositoryService {
  public readonly users: BaseRepository<User> = new UserRepository();
  public readonly userTypes: BaseRepository<UserType> = new UserTypeRepository();
  public readonly chats: BaseRepository<Chat> = new ChatRepository();
  public readonly jobVacancies: BaseRepository<JobVacancy> = new JobVacancyRepository();
  public readonly knowledges: BaseRepository<Knowledge> = new KnowledgeRepository();
  public readonly knowledgeTypes: BaseRepository<KnowledgeType> = new KnowledgeTypeRepository();
  public readonly messages: BaseRepository<Message> = new MessageRepository();
  public readonly notifications: BaseRepository<Notification> = new NotificationRepository();
  public readonly proposals: BaseRepository<Proposal> = new ProposalRepository();
  public readonly reports: BaseRepository<Report> = new ReportRepository();
}
