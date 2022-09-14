/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export function up (knex) {
    return knex.schema
        .createTable('user', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('email').notNullable();
            table.string('first_name');
            table.string('last_name');
            table.enum('role', ['user', 'admin']).defaultTo('user');
            table.boolean('is_active').defaultTo(false);
            table.boolean('is_confirmed').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').defaultTo(null)
        })
        .createTable('user_settings', (table) => {
            table.increments('id').primary();
            // table.integer('user_id').notNullable().references('id').inTable('users');
            table.string('theme').defaultTo('light');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').defaultTo(null)
            table.integer('user_id').unsigned().unique().references('id').inTable('user');
        })
        .createTable('group', (table) => {
            table.increments('id').primary();
            table.string('name')
            table.string('title')
            table.text('description')
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').defaultTo(null)
            table.integer('user_id').unsigned().references('id').inTable('user')
        })
        .createTable('monitor', (table) => {
            table.increments('id').primary();
            table.string('name')
            table.text('description')
            table.string('url')
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').defaultTo(null)
            table.integer('user_id').unsigned().references('id').inTable('user')
        })
        .createTable('group_monitor', (table) => {
            table.increments('id').primary();
            table.integer('group_id').unsigned().references('id').inTable('group')
            table.integer('monitor_id').unsigned().references('id').inTable('monitor')
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export function down (knex) {
    return knex.schema
        .dropTable('user')
        .dropTable('user_settings')
        .dropTable('group')
        .dropTable('monitor')
        .dropTable('group_monitor');
}
