import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('user_type')
    .del()
    .then(() => {
      return knex('user_type').insert([
        { id: 1, name: 'employer' },
        { id: 2, name: 'professional' },
        { id: 3, name: 'admin' },
      ]);
    });
}
