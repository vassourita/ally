import { formatRFC3339, isBefore, subDays, parseISO } from 'date-fns';

import { Database } from '@database/Database';

interface IFilterQuery {
  days: string;
  local: string;
  user: any;
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

    const jobs = await Database.getInstance().query<any>(`
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

    const filteredJobs = jobs.filter(job => {
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

    switch (days) {
    case 'month': {
      return filteredJobs.filter(
        job => !isBefore(parseISO(formatRFC3339(job.created_at)), subDays(parseISO(new Date().toString()), 30)),
      );
    }
    case 'week': {
      return filteredJobs.filter(
        job => !isBefore(parseISO(formatRFC3339(job.created_at)), subDays(parseISO(new Date().toString()), 7)),
      );
    }
    default: {
      return filteredJobs;
    }
    }

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
