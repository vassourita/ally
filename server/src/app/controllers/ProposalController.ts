import { Request, Response } from 'express';

import ChatRepository from '../repositories/ChatRepository';
import MessageRepository from '../repositories/MessageRepository';
import ProposalRepository from '../repositories/ProposalRepository';

import WebSocket from '../../WebSocket';

export default class ProposalController {
  async store(req: Request, res: Response) {
    const { userId } = res.locals;
    const { jobVacancyId } = req.body;

    const proposal = await ProposalRepository.create({
      user_id: userId,
      job_vacancy_id: jobVacancyId,
    });

    res.status(201).json({ proposal });
  }

  async update(req: Request, res: Response) {
    const employerId = res.locals.userId;
    const proposalId = req.params.id;
    const { content } = req.body;

    const proposal = await ProposalRepository.findOne({
      where: { id: proposalId },
    });

    let chat: any = await ChatRepository.findOne({
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

    const ws = WebSocket.getInstance();

    const target = ws.connectedUsers[chat.user_id.toString()];

    if (target) {
      target.connection.emit('new_message', { message });
    }

    await ProposalRepository.delete({
      where: { id: proposalId },
    });

    res.status(201).json({ message });
  }
}
