/* eslint-disable import/prefer-default-export */
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('user')
    .where('employer', true)
    .select('id')
    .then(users => {
      const data = users.map(user => [
        {
          employer_id: user.id,
          name: 'Vaga para Cozinheiro',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          local: 'city',
          amount: 2,
        },
        {
          employer_id: user.id,
          name: 'Vaga para Garçom',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          local: 'region',
          amount: 2,
        },
        {
          employer_id: user.id,
          name: 'Vaga para Entregador',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          local: 'state',
          amount: 2,
        },
        {
          employer_id: user.id,
          name: 'Vaga para Gerente',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          local: 'any',
          amount: 1,
        },
      ]);
      return knex('job_vacancy').insert(data.flat());
    });
}
