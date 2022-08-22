/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
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
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('user_settings', (table) => {
            table.increments('id').primary();
            // table.integer('user_id').notNullable().references('id').inTable('users');
            table.string('theme').defaultTo('light');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.integer('user_id').unsigned().unique().references('id');
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema
        .dropTable('user')
        .dropTable('user_settings');
}
