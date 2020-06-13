import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('message', table => {
    table.increments('id').primary().notNullable();
    table.integer('author_id').unsigned().references('id').inTable('user').onDelete('SET NULL');
    table.integer('chat_id').unsigned().references('id').inTable('chat').onDelete('CASCADE');
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('message');
}
