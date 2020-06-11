import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTableIfNotExists('notification', table => {
    table.increments('id').primary().notNullable();
    table.string('title', 48).notNullable();
    table.string('description').notNullable();
    table.string('link', 48).notNullable();
    table.integer('user_id').notNullable().unsigned().references('id').inTable('user').onDelete('CASCADE');
    table.boolean('is_read').notNullable().notNullable().defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('notification');
}
