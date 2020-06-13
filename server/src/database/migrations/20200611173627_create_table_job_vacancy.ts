import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('job_vacancy', table => {
    table.increments('id').primary().notNullable();
    table.integer('employer_id').notNullable().unsigned().references('id').inTable('user').onDelete('CASCADE');
    table.string('name', 50).notNullable();
    table.text('description').notNullable();
    table.integer('amount').notNullable();
    table.string('local', 10).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('job_vacancy');
}
