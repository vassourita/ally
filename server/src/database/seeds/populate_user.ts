/* eslint-disable import/prefer-default-export */
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('user')
    .where('employer', false)
    .del()
    .then(() => {
      return knex('user').insert([
        {
          name: 'Vinicius Vassão',
          email: 'vassao@ally.com',
          password: '$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW',
          fiscal_code: '52438436875',
          phone: '13997261001',
          image_url: 'seed-user-7.jpg',
          postal_code: '11030600',
          city: 'Santos',
          state: 'SP',
          address: 'Avenida Doutor Epitácio Pessoa',
          neighborhood: 'Aparecida',
          microregion_id: 35063,
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          employer: false,
        },
      ]);
    });
}
