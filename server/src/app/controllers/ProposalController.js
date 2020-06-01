import ProposalRepository from '../repositories/ProposalRepository';

import WebSocket from '../../WebSocket';

export default class ProposalController {
  static async store(req, res) {
    const { userId } = req;
    const { jobVacancyId } = req.body;

    const proposal = await ProposalRepository.create({
      user_id: userId,
      job_vacancy_id: jobVacancyId,
    });

    return res.status(201).json({ proposal });
  }

  static async update(req, res) {
    const { employerId } = req.userId;
    const proposalId = req.params.id;

    const proposal = await ProposalRepository.findOne({
      where: { id: proposalId },
    });

    let chat = await ChatRepository.findOne({
      where: { id: chatId },
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

    return res.status(201).json({ message });
  }
}
