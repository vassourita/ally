import { isBefore, subDays } from 'date-fns';

import { JobVacancy } from '@root/app/models/JobVacancy';
import { Knowledge } from '@root/app/models/Knowledge';
import { User } from '@root/app/models/User';
import { KnowledgeRepository } from '@root/app/repositories/KnowledgeRepository';
import { KnowledgeTypeRepository } from '@root/app/repositories/KnowledgeTypeRepository';
import { UserRepository } from '@root/app/repositories/UserRepository';

import { Database } from '@database/Database';

interface IFilterQuery {
  days: string;
  local: string;
  user: User;
}

interface IMatch {
  knowledge: Knowledge;
  match: boolean;
  differential?: Knowledge;
  requirement?: Knowledge;
}

interface IMatches extends JobVacancy {
  diffMatchPercent: number;
  differentialMatches: IMatch[];
  reqMatchPercent: number;
  requirementMatches: IMatch[];
}

export class JobService {
  public async filterJobs({ days, local, user }: IFilterQuery) {
    let localFilter = '';

    switch (local) {
    case 'region': {
      localFilter = ` AND user.microregion_id = ${Database.escape(user.microregion_id)} `;
      break;
    }
    case 'city': {
      localFilter = ` AND user.city = ${Database.escape(user.city)} `;
      break;
    }
    case 'state': {
      localFilter = ` AND user.state = ${Database.escape(user.state)} `;
      break;
    }
    default:
      break;
    }

    const jobs = await Database.getInstance().query<JobVacancy>(`
      SELECT
        job_vacancy.id, job_vacancy.name, job_vacancy.local,
        job_vacancy.amount, job_vacancy.created_at, job_vacancy.description,
        JSON_OBJECT(
          'id', user.id,
          'name', user.name,
          'email', user.email,
          'fiscal_code', user.fiscal_code,
          'image_url', user.image_url,
          'phone', user.phone,
          'city', user.city,
          'state', user.state,
          'address', user.address,
          'neighborhood', user.neighborhood,
          'microregion_id', user.microregion_id,
          'postal_code', user.postal_code,
          'employer', user.employer,
          'about', user.about,
          'created_at', user.created_at
        ) AS employer,
        IF(
          knowledge.id IS NULL,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', knowledge.id,
              'name', knowledge.name,
              'differential', knowledge.differential,
              'type', JSON_OBJECT(
                'id', knowledge_type.id,
                'name', knowledge_type.name
              )
            )
          )
        ) AS knowledges
      FROM job_vacancy
        INNER JOIN user ON
          user.id = job_vacancy.employer_id
          ${localFilter}
        LEFT JOIN knowledge ON
          knowledge.job_vacancy_id = job_vacancy.id
        LEFT JOIN knowledge_type ON
          knowledge_type.id = knowledge.knowledge_type_id
      WHERE
        job_vacancy.amount > 0 AND
        job_vacancy.id NOT IN (
          SELECT DISTINCT proposal.job_vacancy_id
          FROM proposal
          WHERE proposal.user_id = ${user.id}
        )
      GROUP BY job_vacancy.id
    `);

    const jobsByLocal = jobs.filter(job => {
      if (job.local === 'region' && user.microregion_id !== job.employer.microregion_id) {
        return false;
      }
      if (job.local === 'state' && user.state !== job.employer.state) {
        return false;
      }
      if (job.local === 'city' && user.city !== job.employer.city && user.state !== job.employer.state) {
        return false;
      }
      return true;
    });

    const jobsByDate = this.filterByDate(days, jobsByLocal);

    const jobsByUser = this.getJobMatchData(jobsByDate, user, true);

    return jobsByUser.filter(j => j !== null);
  }

  public filterByDate(days: string, jobs: JobVacancy[]) {
    switch (days) {
    case 'month':
      return jobs.filter(
        job => !isBefore(new Date(job.created_at), subDays(new Date(), 31)),
      );

    case 'week':
      return jobs.filter(
        job => !isBefore(new Date(job.created_at), subDays(new Date(), 8)),
      );

    default:
      return jobs;
    }
  }

  public getJobMatchData(jobList: JobVacancy[], user: User, filter: boolean): IMatches[] {
    const jobs = jobList.map(job => {
      const requirementMatches: IMatch[] = [];
      const differentialMatches: IMatch[] = [];

      const requirements = job.knowledges.filter(k => !k.differential);

      job.knowledges.filter(k => k.differential).forEach(differential => {
        const name = this.normalize(differential.name);

        const userKnowledgeNames = user.knowledges.map(k => this.normalize(k.name));
        const knowledge = user.knowledges.find(k => this.normalize(k.name) === name);

        if (!userKnowledgeNames.includes(name)) {
          differentialMatches.push({ knowledge, differential, match: false });
          return;
        }

        if (knowledge.type.id > differential.type.id) {
          differentialMatches.push({ knowledge, differential, match: false });
          return;
        }

        differentialMatches.push({ knowledge, differential, match: true });
      });

      const matchedRequirements = requirements.filter(requirement => {
        const name = this.normalize(requirement.name);

        const userKnowledgeNames = user.knowledges.map(k => this.normalize(k.name));
        const knowledge = user.knowledges.find(k => this.normalize(k.name) === name);

        if (!userKnowledgeNames.includes(name)) {
          requirementMatches.push({ knowledge, requirement, match: false });
          return false;
        }

        if (knowledge.type.id > requirement.type.id) {
          requirementMatches.push({ knowledge, requirement, match: false });
          return false;
        }

        requirementMatches.push({ knowledge, requirement, match: true });
        return true;
      });

      const reqPercent = () => (job.knowledges.filter(k => !k.differential).length
        ? ((requirementMatches.filter(r => r.match).length * 100) / job.knowledges.filter(k => !k.differential).length) || 0
        : 100);
      const diffPercent = () => (job.knowledges.filter(k => k.differential).length
        ? ((differentialMatches.filter(r => r.match).length * 100) / job.knowledges.filter(k => k.differential).length) || 0
        : 100);

      if (filter) {
        return matchedRequirements.length === requirements.length ? ({
          ...job,
          diffMatchPercent: diffPercent(),
          reqMatchPercent: reqPercent(),
          differentialMatches,
          requirementMatches,
        }) : null;
      }
      return ({
        ...job,
        diffMatchPercent: diffPercent(),
        reqMatchPercent: reqPercent(),
        differentialMatches,
        requirementMatches,
      });
    });

    return jobs.filter(j => j !== null);
  }

  public normalize(s: string) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  public async generateMatchData(jobList: JobVacancy[]) {
    const jobs = await Promise.all(jobList.map(async job => {
      const requirements = job.knowledges.filter(k => !k.differential);
      const differentials = job.knowledges.filter(k => k.differential);

      const proposals = await Promise.all(job.proposals.map(async proposal => {
        const user = await UserRepository.findOne({
          where: { id: proposal.user_id },
          join: [
            {
              repo: KnowledgeRepository,
              attrs: ['id', 'name'],
              on: { user_id: 'user.id' },
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
          ]
        });

        const requirementMatches: IMatch[] = [];
        const differentialMatches: IMatch[] = [];

        differentials.forEach(differential => {
          const name = this.normalize(differential.name);

          const userKnowledgeNames = user.knowledges.map(k => this.normalize(k.name));
          const knowledge = user.knowledges.find(k => this.normalize(k.name) === name);

          if (!userKnowledgeNames.includes(name)) {
            differentialMatches.push({ knowledge, differential, match: false });
            return;
          }

          if (knowledge.type.id > differential.type.id) {
            differentialMatches.push({ knowledge, differential, match: false });
            return;
          }

          differentialMatches.push({ knowledge, differential, match: true });
        });

        requirements.forEach(requirement => {
          const name = this.normalize(requirement.name);

          const userKnowledgeNames = user.knowledges.map(k => this.normalize(k.name));
          const knowledge = user.knowledges.find(k => this.normalize(k.name) === name);

          if (!userKnowledgeNames.includes(name)) {
            requirementMatches.push({ knowledge, requirement, match: false });
            return;
          }

          if (knowledge.type.id > requirement.type.id) {
            requirementMatches.push({ knowledge, requirement, match: false });
            return;
          }

          requirementMatches.push({ knowledge, requirement, match: true });
        });

        const reqPercent = () => (job.knowledges.filter(k => !k.differential).length
          ? ((requirementMatches.filter(r => r.match).length * 100) / job.knowledges.filter(k => !k.differential).length) || 0
          : 100);
        const diffPercent = () => (job.knowledges.filter(k => k.differential).length
          ? ((differentialMatches.filter(r => r.match).length * 100) / job.knowledges.filter(k => k.differential).length) || 0
          : 100);

        return {
          ...proposal,
          user,
          differentialMatches,
          requirementMatches,
          reqMatchPercent: reqPercent(),
          diffMatchPercent: diffPercent()
        };
      }));

      return {
        ...job,
        proposals
      };
    }));

    return jobs;
  }
}
