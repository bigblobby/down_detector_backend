import knex from '../db/database.js';

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
        this.knex = knex;
    }

    findAll() {
        return this.knex.select().from(this.tableName);
    }

    findBy(column, value) {
        return this.knex.select().from(this.tableName).where(column, value);
    }

    find(filters = {}){
        return this.knex.select().from(this.tableName).where(filters);
    }

    findOne(filters = {}) {
        return this.find(filters).first().then(row => row);
    }

    findById(id) {
        return this.findBy('id', id);
    }

    create(data) {
        return this.knex.insert(data).into(this.tableName);
    }

    update(id, data) {
        return this.knex.update(data).from(this.tableName).where('id', id);
    }

    remove(id) {
        return this.knex.delete().from(this.tableName).where('id', id);
    }
}


export default BaseModel;