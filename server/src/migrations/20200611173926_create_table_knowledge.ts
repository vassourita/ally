import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTableIfNotExists('knowledge', table => {
    table.increments('id').primary().notNullable();
    table.string('name', 80).notNullable();
    table.integer('user_id').unsigned().references('id').inTable('user').onDelete('CASCADE');
    table.integer('job_vacancy_id').unsigned().references('id').inTable('job_vacancy').onDelete('CASCADE');
    table
      .integer('knowledge_type_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('knowledge_type')
      .onDelete('CASCADE');
    table.boolean('differential');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('knowledge');
}
