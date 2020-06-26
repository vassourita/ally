import { Request, Response } from 'express';

import { RepositoryService } from '@services/RepositoryService';

import { IController } from '@controllers/IController';

export class NotificationController implements IController {
  constructor(private readonly repoService: RepositoryService) {}

  async index(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;

    const notifications = await this.repoService.notifications.find({
      where: { user_id: userId },
    });

    res.status(200).json({ notifications });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const notifications = await this.repoService.notifications.update({
      set: { is_read: true },
      where: { id: Number(id) },
    });

    res.status(200).json({ notifications });
  }
}
