import { Request, Response } from 'express';

import { RepositoryService } from '@services/RepositoryService';

import { IController } from '@controllers/IController';

export class ReportController implements IController {
  constructor(private readonly repoService: RepositoryService) {}

  public index = async (req: Request, res: Response): Promise<void> => {
    const reports = await this.repoService.reports.find();

    res.status(201).json({ reports });
  }

  public store = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals;
    const { description, jobVacancyId } = req.body;

    const report = await this.repoService.reports.create({
      description,
      user_id: userId,
      job_vacancy_id: jobVacancyId,
    });

    res.status(201).json({ report });
  }
}
