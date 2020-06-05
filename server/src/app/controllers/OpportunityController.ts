import { Request, Response } from 'express';

import IController from './IController';
import UserRepository from '../repositories/UserRepository';
import KnowledgeRepository from '../repositories/KnowledgeRepository';
import KnowledgeTypeRepository from '../repositories/KnowledgeTypeRepository';

import JobService from '../../services/JobService';

export default class OpportunityController extends IController {
  async index(req: Request, res: Response) {
    const { userId } = res.locals;
    const { days, local } = req.query;

    const user = await UserRepository.findOne({
      where: { id: userId },
      join: [
        {
          repo: KnowledgeRepository,
          on: { user_id: 'user.id' },
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              type: 'single',
              as: 'type',
            },
          ],
        },
      ],
    });

    const jobs = await JobService.filterJobs({ days: Number(days), local: String(local), user });

    res.status(200).json({ jobs });
  }
}