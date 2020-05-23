/* eslint-disable operator-linebreak */
import Database from '../app/Data/Database';

export default class JobService {
  static async filterJobs({ days, microregion, local, userId }) {
    const microregionFilter =
      local === 'region' && microregion ? Database.escape(Number(microregion)) : 'ANY (SELECT DISTINCT microregion_id FROM user)';

    const sql = `
      SELECT
        job_vacancy.id, job_vacancy.name, job_vacancy.description,
        job_vacancy.amount, job_vacancy.created_at, job_vacancy.local,
        JSON_OBJECT(
          'id', employer.id,
          'name', employer.name,
          'email', employer.email,
          'fiscal_code', employer.fiscal_code,
          'image_url', employer.image_url,
          'phone', employer.phone,
          'city', employer.city,
          'state', employer.state,
          'address', employer.address,
          'neighborhood', employer.neighborhood,
          'microregion_id', employer.microregion_id,
          'postal_code', employer.postal_code,
          'employer', employer.employer,
          'birth', employer.birth,
          'about', employer.about,
          'created_at', employer.created_at,
          'likes', COUNT(DISTINCT rating.id)
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
              ),
              'is_met', (knowledge_type.id >= user_knowledge.knowledge_type_id AND
                        LOWER(knowledge.name) = LOWER(user_knowledge.name))
            )
          )
        ) AS knowledges
      FROM
        job_vacancy
      INNER JOIN user AS employer
        ON employer.id = job_vacancy.employer_id
        AND employer.microregion_id = ${microregionFilter}
      LEFT JOIN rating
        ON rating.target_id = employer.id
      LEFT JOIN knowledge
        ON knowledge.job_vacancy_id = job_vacancy.id
        AND job_vacancy.amount > 0
      LEFT JOIN knowledge_type
        ON knowledge_type.id = knowledge.knowledge_type_id
      LEFT JOIN user AS professional
        ON professional.id = ${Database.escape(Number(userId))}
      INNER JOIN knowledge AS user_knowledge
        ON user_knowledge.user_id = professional.id
      INNER JOIN knowledge_type AS user_knowledge_type
        ON user_knowledge_type.id = user_knowledge.knowledge_type_id
      ${days ? ` WHERE DATE(job_vacancy.created_at) >= (NOW() - INTERVAL ${Database.escape(Number(days))} DAY) ` : ''}
      GROUP BY job_vacancy.id
    `;

    const jobs = await Database.getInstance().query(sql);

    const jobsWithFormattedKnowledges = jobs.map(job => ({
      ...job,
      knowledges: job.knowledges.sort().filter((item, i, arr) => (arr[i - 1] ? item.id !== arr[i - 1].id : true)),
    }));

    function isValidJob(job) {
      if (!job.knowledges.length) {
        return true;
      }

      const allDifferential = job.knowledges.filter(k => !k.differential).length === job.knowledges.length;

      if (allDifferential) {
        return true;
      }

      const hasMetAllRequired = !!job.knowledges
        .filter(k => !k.differential)
        .filter(k => {
          if (k.is_met) return true;
          return false;
        }).length;

      if (hasMetAllRequired) {
        return true;
      }

      return false;
    }

    const validJobs = jobsWithFormattedKnowledges.filter(isValidJob);
    return validJobs;
  }
}
