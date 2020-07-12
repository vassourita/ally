import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('chat', table => {
    table.integer('job_vacancy_id').notNullable().unsigned().references('id').inTable('job_vacancy').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('chat', table => {
    table.dropColumn('job_vacancy_id');
  });
}
