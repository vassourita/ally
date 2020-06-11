import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTableIfNotExists('knowledge_type', table => {
    table.increments('id').primary().notNullable();
    table.string('name', 24).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('knowledge_type');
}
