import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', table => {
    table.string('curriculum', 80);
  });
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', table => {
    table.dropColumn('curriculum');
  });
}
