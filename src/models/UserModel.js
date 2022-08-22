import BaseModel from "./BaseModel.js";
import passwordService from "../services/password/index.js";

class UserModel extends BaseModel {
    constructor() {
        super('user');
        this.passwordService = passwordService;
    }

    async create(data) {
        // Create user
        const user = await super.create(data);

        // Add default user settings
        await this.knex.insert({user_id: user[0]}).into('user_settings')

        // Find and return created user
        return await this.findOne({'email': data.email})
    }

    findOne(filters = {}) {
        return this.knex
            .select(
                'user.*',
                'user_settings.created_at as settings_created_at',
                'user_settings.updated_at as settings_updated_at',
                'user_settings.theme as settings_theme',
            )
            .from(this.tableName)
            .leftJoin('user_settings', function() {
                this.on('user_settings.user_id', 'user.id');
            })
            .where(filters)
            .first();
    }

    findById(id) {
        return this.findOne({'user.id': id});
    }

    findExistingUser(username, email) {
        return this.knex.from(this.tableName).where({username: username}).orWhere({email: email});
    }
}

export default UserModel;