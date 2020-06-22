import { Request, Response } from 'express';

import { WebSocket } from '@root/WebSocket';

import { IController } from '@controllers/IController';

import { ChatRepository } from '@repositories/ChatRepository';
import { MessageRepository } from '@repositories/MessageRepository';
import { UserRepository } from '@repositories/UserRepository';

export class MessageController implements IController {
  async index(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;

    const user = await UserRepository.findOne({
      attrs: ['employer'],
      where: { id: userId },
    });

    const idFilter = user.employer ? ['employer', 'user'] : ['user', 'employer'];

    const chats = await ChatRepository.find({
      where: { [`${idFilter[0]}_id`]: userId },
      join: [
        {
          repo: MessageRepository,
          on: { chat_id: 'chat.id' },
          type: 'many',
          as: 'messages',
        },
        {
          repo: UserRepository,
          on: { id: `chat.${idFilter[1]}_id` },
          as: idFilter[1],
          type: 'single',
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

    const user = await UserRepository.findOne({
      attrs: ['employer'],
      where: { id: userId },
    });

    const idFilter = user.employer ? 'employer' : 'user';

    const chat = await ChatRepository.findOne({
      where: { id: chatId },
      join: [
        {
          repo: UserRepository,
          on: { id: `chat.${idFilter}_id` },
          as: idFilter,
          type: 'single',
        },
      ]
    });

    message.chat = chat;

    const targetId = userId === chat.employer_id ? chat.user_id : chat.employer_id;

    const ws = WebSocket.getInstance();
    const target = ws.connectedUsers[targetId.toString()];

    if (target) {
      target.connection.emit('new_message', { message });
    }

    res.status(201).json({ message });
  }
}
