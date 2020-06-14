import { Request, Response } from 'express';

import { IController } from './IController';
import UserRepository from '../repositories/UserRepository';
import ChatRepository from '../repositories/ChatRepository';
import MessageRepository from '../repositories/MessageRepository';
import ProposalRepository from '../repositories/ProposalRepository';
import KnowledgeRepository from '../repositories/KnowledgeRepository';
import JobVacancyRepository from '../repositories/JobVacancyRepository';
import NotificationRepository from '../repositories/NotificationRepository';
import KnowledgeTypeRepository from '../repositories/KnowledgeTypeRepository';

import WebSocket from '../../WebSocket';

export default class ProposalController implements IController {
  async index(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;

    const proposal = await ProposalRepository.find({
      where: { user_id: userId },
      join: [
        {
          repo: UserRepository,
          on: { id: 'proposal.employer_id' },
          type: 'single',
          as: 'employer',
        },
        {
          repo: JobVacancyRepository,
          on: { id: 'proposal.job_vacancy_id' },
          type: 'single',
          join: [
            {
              repo: KnowledgeRepository,
              on: { job_vacancy_id: 'job_vacancy.id' },
              type: 'many',
              as: 'job',
              join: [
                {
                  repo: KnowledgeTypeRepository,
                  on: { id: 'knowledge.knowledge_type_id' },
                  as: 'type',
                  type: 'single',
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json({ proposal });
  }

  async store(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { jobVacancyId } = req.body;

    const proposal = await ProposalRepository.create({
      user_id: userId,
      job_vacancy_id: jobVacancyId,
      status: 'awaiting',
    });

    res.status(201).json({ proposal });
  }

  async update(req: Request, res: Response): Promise<void> {
    const employerId = res.locals.userId;
    const proposalId = req.params.id;
    const { content, status } = req.body;

    const proposal = await ProposalRepository.findOne({
      where: { id: proposalId },
      join: [
        {
          repo: UserRepository,
          on: { id: 'proposal.employer_id' },
          type: 'single',
          as: 'employer',
        },
        {
          repo: JobVacancyRepository,
          on: { id: 'proposal.job_vacancy_id' },
          type: 'single',
          as: 'job',
        },
      ],
    });

    if (!proposal) {
      res.status(404).json({ error: { message: 'Proposal not found', field: 'id' } });
      return;
    }

    if (proposal.status !== 'awaiting') {
      res.status(401).json({ error: { message: 'Proposal is not waiting for approval', field: 'id' } });
      return;
    }

    if (![true, false].includes(status)) {
      res.status(401).json({ error: { message: 'Invalid status sent', field: 'status' } });
      return;
    }

    let chat = await ChatRepository.findOne({
      where: { employer_id: employerId, user_id: proposal.user_id },
    });

    if (!chat) {
      chat = await ChatRepository.create({
        employer_id: employerId,
        user_id: proposal.user_id,
      });
    }

    const message = await MessageRepository.create({
      author_id: employerId,
      chat_id: chat.id,
      content,
    });

    let title: string;
    let text: string;
    let link: string;
    if (status === true) {
      title = 'Proposta aceita';
      text = `Sua proposta para ${proposal.job.name} foi aceita! A empresa ${proposal.employer.name} entrará em contato.`;
      link = `/proposals/${proposalId}`;
    } else {
      title = 'Proposta negada';
      text = `Sua proposta para ${proposal.job.name} foi negada.`;
      link = `/proposals/${proposalId}`;
    }

    const notification = await NotificationRepository.create({
      user_id: proposal.user_id,
      title,
      description: text,
      link,
      is_read: false,
    });

    const ws = WebSocket.getInstance();

    const target = ws.connectedUsers[proposal.user_id.toString()];

    if (target) {
      target.connection.emit('new_message', { message });
      target.connection.emit('new_notification', { notification });
    }

    res.status(201).json({ message });
  }
}
