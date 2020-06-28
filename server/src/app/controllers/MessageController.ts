import { Request, Response } from 'express';

import { RepositoryService } from '@services/RepositoryService';
import { WebSocketService } from '@services/WebSocketService';

import { IController } from '@controllers/IController';

export class MessageController implements IController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly wsService: WebSocketService
  ) {}

  public index = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals;

    const user = await this.repoService.users.findOne({
      attrs: ['employer'],
      where: { id: userId },
    });

    const idFilter = user.employer ? ['employer', 'user'] : ['user', 'employer'];

    const chats = await this.repoService.chats.find({
      where: { [`${idFilter[0]}_id`]: userId },
      join: [
        {
          repo: this.repoService.messages,
          on: { chat_id: 'chat.id' },
          type: 'many',
          as: 'messages',
        },
        {
          repo: this.repoService.users,
          on: { id: `chat.${idFilter[1]}_id` },
          as: idFilter[1],
          type: 'single',
        },
      ],
    });

    res.status(200).json({ chats });
  }

  public store = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals;
    const { content, chatId } = req.body;

    const message = await this.repoService.messages.create({
      author_id: userId,
      chat_id: chatId,
      content,
    });

    const user = await this.repoService.users.findOne({
      attrs: ['employer'],
      where: { id: userId },
    });

    const idFilter = user.employer ? 'employer' : 'user';

    const chat = await this.repoService.chats.findOne({
      where: { id: chatId },
      join: [
        {
          repo: this.repoService.users,
          on: { id: `chat.${idFilter}_id` },
          as: idFilter,
          type: 'single',
        },
      ]
    });

    message.chat = chat;

    const targetId = userId === chat.employer_id ? chat.user_id : chat.employer_id;

    await this.wsService.sendMessage(targetId.toString(), message);

    res.status(201).json({ message });
  }
}
