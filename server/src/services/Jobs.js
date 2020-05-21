import JobVacancyRepository from '../app/Repositories/JobVacancyRepository';
import Database from '../app/Data/Database';

export default class JobServices {
  static async filterJobs({ days, microregion, local }) {
    let query = '';

    if (local.toLowerCase() === 'any') {
      query = `
        WHERE
          jv.region_only = false OR
          u.microregion_id = ${Database.escape(microregion)}
      `;
    }
    if (local.toLowerCase() === 'region') {
      query = `
        WHERE
          u.microregion_id = ${Database.escape(microregion)}
      `;
    }

    if (days) {
      if (query !== '') {
        query += `
          AND jv.created_at >= DATE_SUB(CURDATE(), INTERVAL ${Database.escape(Number(days))} DAY)
        `;
      } else {
        query = `
          WHERE
            jv.created_at >= DATE_SUB(CURDATE(), INTERVAL ${Database.escape(Number(days))} DAY)
        `;
      }
    }

    const sql = `
      SELECT jv.id, jv.name, jv.description, jv.region_only, jv.created_at,
        JSON_OBJECT(
          'id', u.id,
          'name', u.name,
          'about', u.about,
          'image_url', u.image_url,
          'city', u.city,
          'state', u.state,
          'address', u.address,
          'neighborhood', u.neighborhood,
          'rating', AVG(r.stars)
        ) AS employer
      FROM job_vacancy AS jv
        LEFT JOIN user AS u
          ON jv.employer_id = u.id
        LEFT JOIN rating AS r
          ON r.target_id = u.id
        ${query}
      GROUP BY jv.id
    `;

    const db = Database.getInstance();
    const results = await db.query(sql);

    return results;
  }
}
