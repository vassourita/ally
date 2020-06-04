import UserRepository from '../repositories/UserRepository';
import KnowledgeRepository from '../repositories/KnowledgeRepository';
import KnowledgeTypeRepository from '../repositories/KnowledgeTypeRepository';

import JobService from '../../services/JobService';

export default class OpportunityController {
  static async index(req, res) {
    const { days, local } = req.query;

    const user = await UserRepository.findOne({
      where: { id: req.userId },
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

    const jobs = await JobService.filterJobs({ days, local, user });

    return res.status(200).json({ jobs });
  }
}
