import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTableIfNotExists('chat', table => {
    table.increments('id').primary().notNullable();
    table.integer('employer_id').unsigned().references('id').inTable('user').onDelete('SET NULL');
    table.integer('user_id').unsigned().references('id').inTable('user').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('chat');
}
