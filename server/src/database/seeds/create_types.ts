/* eslint-disable import/prefer-default-export */
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('knowledge_type')
    .del()
    .then(() => {
      return knex('knowledge_type').insert([
        { id: 1, name: 'Especialização' },
        { id: 2, name: 'Graduação' },
        { id: 3, name: 'Certificação' },
        { id: 4, name: 'Curso' },
        { id: 5, name: 'Experiência' },
        { id: 6, name: 'Conhecimento' },
      ]);
    });
}
