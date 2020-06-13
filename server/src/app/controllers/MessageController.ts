import { Request, Response } from 'express';

import { IController } from './IController';
import ChatRepository from '../repositories/ChatRepository';
import MessageRepository from '../repositories/MessageRepository';

import WebSocket from '../../WebSocket';

export default class MessageController implements IController {
  async index(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;

    const chats = await ChatRepository.find({
      where: { user_id: userId },
      join: [
        {
          repo: MessageRepository,
          on: { chat_id: 'chat.id' },
          type: 'many',
        },
      ],
    });

    res.status(200).json({ chats });
  }

  async store(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { content, chatId } = req.body;

    const message = await MessageRepository.create({
      author_id: userId,
      chat_id: chatId,
      content,
    });

    const chat = await ChatRepository.findOne({
      where: { id: chatId },
    });

    const ws = WebSocket.getInstance();

    const targetId = userId === chat.employer_id ? chat.user_id : chat.employer_id;

    const target = targetId && ws.connectedUsers[targetId.toString()];

    if (target) {
      target.connection.emit('new_message', { message });
    }

    res.status(201).json({ message });
  }
}
