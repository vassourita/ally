import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTableIfNotExists('user', table => {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password', 80).notNullable();
    table.string('fiscal_code', 14).notNullable();
    table.string('phone', 11).notNullable();
    table.string('image_url', 120).notNullable();
    table.specificType('postal_code', 'CHAR(8)').notNullable();
    table.string('city', 24).notNullable();
    table.specificType('state', 'CHAR(2)').notNullable();
    table.string('address', 60).notNullable();
    table.string('neighborhood', 48).notNullable();
    table.integer('microregion_id').notNullable();
    table.text('about');
    table.boolean('employer').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('user');
}
