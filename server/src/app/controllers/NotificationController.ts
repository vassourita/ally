import { Request, Response } from 'express';

import IController from './IController';
import NotificationRepository from '../repositories/NotificationRepository';
import NotificationTypeRepository from '../repositories/NotificationTypeRepository';

export default class NotificationController extends IController {
  async index(req: Request, res: Response) {
    const { userId } = res.locals;

    const notifications = await NotificationRepository.find({
      where: { user_id: userId },
      join: [
        {
          repo: NotificationTypeRepository,
          on: { id: 'notification.notification_type_id' },
          type: 'single',
          as: 'type',
        },
      ],
    });

    res.status(200).json({ notifications });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const notifications = await NotificationRepository.update({
      set: { is_read: true },
      where: { id },
    });

    res.status(200).json({ notifications });
  }
}
