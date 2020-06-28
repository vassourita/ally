import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', table => {
    table.string('curriculum', 40);
  });
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', table => {
    table.dropColumn('curriculum');
  });
}
