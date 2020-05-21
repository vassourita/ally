import JobVacancyRepository from '../app/Repositories/JobVacancyRepository';
import Database from '../app/Data/Database';

export default class JobServices {
  static filterJobs({ date, microregion, local }) {
    const sql = `
      SELECT jv.id, jv.name, jv.description, jv.region_only, jv.created_at,'
        JSON_OBJECT('
          'name', u.name,
          'about', u.about,
          'image_url', u.image_url,
          'city', u.city,
          'state', u.state,
          'address', u.address,
          'neighborhood', u.neighborhood
          'rating', (SUM(r.stars) / COUNT(DISTINCT r.id))
        ) AS employer'
        FROM job_vacancy AS jv
          LEFT JOIN user AS u
            ON jv.employer_id = u.id
          LEFT JOIN rating AS r
            ON r.target_id = u.id
    `;
  }
}
