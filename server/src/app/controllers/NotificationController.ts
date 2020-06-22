import { Request, Response } from 'express';

import { IController } from '@controllers/IController';

import { NotificationRepository } from '@repositories/NotificationRepository';

export class NotificationController implements IController {
  async index(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;

    const notifications = await NotificationRepository.find({
      where: { user_id: userId },
    });

    res.status(200).json({ notifications });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const notifications = await NotificationRepository.update({
      set: { is_read: true },
      where: { id: Number(id) },
    });

    res.status(200).json({ notifications });
  }
}
