/* eslint-disable import/prefer-default-export */
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('knowledge_type')
    .del()
    .then(() => {
      return knex('knowledge_type').insert([
        { name: 'Especialização' },
        { name: 'Graduação' },
        { name: 'Certificação' },
        { name: 'Curso' },
        { name: 'Experiência' },
        { name: 'Conhecimento' },
      ]);
    });
}
