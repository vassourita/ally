/* eslint-disable import/prefer-default-export */
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('job_vacancy')
    .select('id')
    .then(jobs => {
      const data = jobs.map(job => [
        {
          job_vacancy_id: job.id,
          knowledge_type_id: 6,
          differential: true,
          name: 'Inglês',
        },
      ]);
      return knex('knowledge').insert(data.flat());
    });
}
