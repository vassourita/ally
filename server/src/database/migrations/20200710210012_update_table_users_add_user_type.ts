import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', table => {
    table.integer('user_type_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user_type')
      .onDelete('CASCADE');
    table.dropColumn('employer');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', table => {
    table.dropColumn('user_type_id');
    table.boolean('employer').notNullable();
  });
}
