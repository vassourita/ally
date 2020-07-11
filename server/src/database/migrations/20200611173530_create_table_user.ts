import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password', 80).notNullable();
    table.string('fiscal_code', 14);
    table.string('phone', 11);
    table.string('image_url', 120);
    table.specificType('postal_code', 'CHAR(8)');
    table.string('city', 24);
    table.specificType('state', 'CHAR(2)');
    table.string('address', 60);
    table.string('neighborhood', 48);
    table.integer('microregion_id');
    table.text('about');
    table.boolean('employer');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user');
}
