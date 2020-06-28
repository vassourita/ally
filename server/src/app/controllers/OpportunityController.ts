import { Request, Response } from 'express';

import { JobService } from '@services/JobService';
import { RepositoryService } from '@services/RepositoryService';

import { IController } from '@controllers/IController';

export class OpportunityController implements IController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly jobService: JobService,
  ) {}

  public index = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals;
    const { days, local } = req.query;

    const user = await this.repoService.users.findOne({
      where: { id: userId },
      join: [
        {
          repo: this.repoService.knowledges,
          on: { user_id: 'user.id' },
          type: 'many',
          join: [
            {
              repo: this.repoService.knowledgeTypes,
              on: { id: 'knowledge.knowledge_type_id' },
              type: 'single',
              as: 'type',
            },
          ],
        },
      ],
    });

    const jobs = await this.jobService.filterJobs({ days: days as string, local: local as string, user });

    res.status(200).json({ jobs });
  }
}
