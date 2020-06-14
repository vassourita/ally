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

    const proposals = await ProposalRepository.find({
      where: { user_id: userId },
      join: [
        {
          repo: JobVacancyRepository,
          on: { id: 'proposal.job_vacancy_id' },
          type: 'single',
          as: 'job',
          join: [
            {
              repo: UserRepository,
              on: { id: 'job_vacancy.employer_id' },
              type: 'single',
              as: 'employer',
            },
          ],
        },
      ],
    });

    res.status(200).json({ proposals });
  }

  async store(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { jobVacancyId } = req.body;

    const user = await UserRepository.findOne({
      where: { id: userId },
    });

    const insertId = await ProposalRepository.create(
      {
        user_id: userId,
        job_vacancy_id: jobVacancyId,
        status: 'awaiting',
      },
      false,
    );

    const proposal = await ProposalRepository.findOne({
      where: { id: insertId },
      join: [
        {
          repo: JobVacancyRepository,
          on: { id: 'proposal.job_vacancy_id' },
          type: 'single',
          as: 'job',
        },
      ],
    });

    const notification = await NotificationRepository.create({
      user_id: proposal.job.user_id,
      title: `Nova proposta em '${proposal.job.name}'`,
      description: `Você recebeu uma nova proposta de ${user.name} em sua vaga '${proposal.job.name}'`,
      link: `/vacancies/${proposal.job.id}`,
      is_read: false,
    });

    const ws = WebSocket.getInstance();

    const target = ws.connectedUsers[proposal.job.employer_id.toString()];

    if (target) {
      target.connection.emit('new_notification', { notification });
    }

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
          repo: JobVacancyRepository,
          on: { id: 'proposal.job_vacancy_id' },
          type: 'single',
          as: 'job',
          join: [
            {
              repo: UserRepository,
              on: { id: 'job_vacancy.employer_id' },
              type: 'single',
              as: 'employer',
            },
          ],
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

    let message: any;

    let title: string;
    let text: string;
    let link: string;
    if (status === true) {
      title = 'Proposta aceita';
      text = `Sua proposta para ${proposal.job.name} foi aceita! A empresa ${proposal.job.employer.name} entrará em contato.`;
      link = `/proposals/${proposalId}`;
      await ProposalRepository.update({
        set: { status: 'accepted' },
        where: { id: proposalId },
      });

      let chat = await ChatRepository.findOne({
        where: { employer_id: employerId, user_id: proposal.user_id },
      });

      if (!chat) {
        chat = await ChatRepository.create({
          employer_id: employerId,
          user_id: proposal.user_id,
        });
      }

      message = await MessageRepository.create({
        author_id: employerId,
        chat_id: chat.id,
        content,
      });
    } else {
      title = 'Proposta negada';
      text = `Sua proposta para ${proposal.job.name} foi negada.`;
      link = `/proposals/${proposalId}`;
      await ProposalRepository.update({
        set: { status: 'denied' },
        where: { id: proposalId },
      });
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
      if (message) {
        target.connection.emit('new_message', { message });
      }
      target.connection.emit('new_notification', { notification });
    }

    res.status(201).json({ message });
  }

  async destroy(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const deleted = await ProposalRepository.delete({
      where: { id },
    });

    res.status(200).json({ deleted });
  }
}
