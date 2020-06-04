/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { formatRFC3339, isBefore, subDays, parseISO } from 'date-fns';

import UserRepository from '../app/repositories/UserRepository';
import KnowledgeRepository from '../app/repositories/KnowledgeRepository';
import JobVacancyRepository from '../app/repositories/JobVacancyRepository';
import KnowledgeTypeRepository from '../app/repositories/KnowledgeTypeRepository';

import Database from '../app/data/Database';

export default class JobService {
  static async filterJobs({ days, local, user }) {
    const localFilter = {};

    switch (local) {
      case 'region': {
        localFilter.microregion_id = Database.escape(user.microregion_id);
        break;
      }
      case 'city': {
        localFilter.city = Database.escape(user.city);
        break;
      }
      case 'state': {
        localFilter.state = Database.escape(user.state);
        break;
      }
      default:
        break;
    }

    const jobs = await JobVacancyRepository.find({
      join: [
        {
          repo: UserRepository,
          on: { id: 'job_vacancy.employer_id', ...localFilter },
          type: 'single',
          side: 'INNER',
          as: 'employer',
        },
        {
          repo: KnowledgeRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
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

    return jobs;

    // const jobsFilteredByUser = jobs.filter(job => {
    //   if (!job.knowledges.length) return true;
    //   if (!job.knowledges.filter(k => !k.differential).length) return true;

    //   const requiredKnowledges = job.knowledges.filter(k => !k.differential);
    //   const matchedKnowledges = requiredKnowledges.filter(jobK => {
    //     return !!user.knowledges.filter(userK => {
    //       const sameName = userK.name.toLowerCase() === jobK.name.toLowerCase();
    //       const sameType = userK.type.id <= jobK.type.id;
    //       return sameName && sameType;
    //     }).length;
    //   });

    //   const hasMatchAllRequired = matchedKnowledges.length >= requiredKnowledges.length;

    //   return hasMatchAllRequired;
    // });

    // if (!days) {
    //   return jobsFilteredByUser;
    // }

    // return jobsFilteredByUser.filter(
    //   job => !isBefore(parseISO(formatRFC3339(job.created_at)), subDays(parseISO(new Date()), Number(days))),
    // );
  }
}
