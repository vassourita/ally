import { Request, Response } from 'express';

import { IController } from '@controllers/IController';

import ReportRepository from '@repositories/ReportRepository';

export default class ReportController implements IController {
  async index(req: Request, res: Response): Promise<void> {
    const reports = await ReportRepository.find();

    res.status(201).json({ reports });
  }

  async store(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { description, jobVacancyId } = req.body;

    const report = await ReportRepository.create({
      description,
      user_id: userId,
      job_vacancy_id: jobVacancyId,
    });

    res.status(201).json({ report });
  }
}
