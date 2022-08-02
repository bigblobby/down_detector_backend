const env = process.env.NODE_ENV || 'development'
import knexfile from "../../knexfile.js";
import knex from "knex";

export default knex(knexfile[env]);