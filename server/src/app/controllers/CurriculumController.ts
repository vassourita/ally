import { Request, Response } from 'express';

import { RepositoryService } from '@services/RepositoryService';

import { IController } from '@controllers/IController';

export class CurriculumController implements IController {
  constructor(
    private readonly repoService: RepositoryService,
  ) {}

  public store = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals;
    const { filename } = req.file;

    const updated = await this.repoService.users.update({
      set: { curriculum: `** = '${filename}'` },
      where: { id: Number(userId) },
    });

    res.json({ updated: updated ? filename : false });
  }

  public destroy = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals;

    const updated = await this.repoService.users.update({
      set: { curriculum: null },
      where: { id: Number(userId) },
    });

    res.json({ updated });
  }
}
