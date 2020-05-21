import UserRepository from '../app/Repositories/UserRepository';
import RatingRepository from '../app/Repositories/RatingRepository';
import KnowledgeRepository from '../app/Repositories/KnowledgeRepository';
import JobVacancyRepository from '../app/Repositories/JobVacancyRepository';
import KnowledgeTypeRepository from '../app/Repositories/KnowledgeTypeRepository';

export default class JobService {
  static async filterJobs({ days, microregion, local, userId }) {
    const user = await UserRepository.findOne({
      where: { id: userId },
      join: [
        {
          repo: KnowledgeRepository,
          on: { user_id: 'user.id' },
          as: 'knowledges',
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    const jobs = await JobVacancyRepository.find({
      where: {},
      join: [
        {
          repo: UserRepository,
          on: {
            id: 'job_vacancy.employer_id',
            microregion_id: Number(microregion) || 'ANY (SELECT DISTINCT microregion_id FROM user)',
          },
          as: 'employer',
          type: 'single',
          side: 'INNER',
          join: [
            {
              repo: RatingRepository,
              on: { target_id: 'user.id' },
              as: 'ratings',
              type: 'many',
            },
          ],
        },
        {
          repo: KnowledgeRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'knowledges',
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    const formattedJobs = jobs.map(job => ({
      ...job,
      knowledges: job.knowledges.sort().filter((item, i, arr) => (arr[i - 1] ? item.id !== arr[i - 1].id : true)),
    }));

    if (!user) {
      return formattedJobs;
    }

    const filteredJobs = formattedJobs.filter(job => {
      if (!job.knowledges.length) return true;

      const metRequirements = job.knowledges
        .filter(jobK => !jobK.differential)
        .filter(
          jobK =>
            !!user.knowledges.filter(userK => {
              if (jobK.name.toLowerCase() !== userK.name.toLowerCase()) return false;

              if (jobK.type.id < userK.type.id) return false;

              return true;
            }).length,
        );

      return !!metRequirements.length;
    });

    return filteredJobs;
  }
}
