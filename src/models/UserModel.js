import BaseModel from "./BaseModel.js";
import AuthHelper from "../helpers/auth/index.js";

class UserModel extends BaseModel {
    constructor() {
        super('users');
    }

    async _beforeSave(data){
        return AuthHelper.hashPassword(data.password)
            .then(hash => {
                return {...data, password: hash}
            })
            .catch(err => `Error hashing password: ${ err }`)
    }

    async create(data) {
        return await this._beforeSave(data).then(data => {
            return super.create(data);
        }).then(user => {
            return Promise.all([
                user,
                this.knex.insert({user_id: user[0].id}).into('user_settings')
            ])
        }).then(([user, _]) => {
            return user;
        })
    }

    findOne(filters = {}) {
        return this.knex
            .select(
                'users.*',
                'user_settings.created_at as settings_created_at',
                'user_settings.updated_at as settings_updated_at',
                'user_settings.theme as settings_theme',
            )
            .from(this.tableName)
            .leftJoin('user_settings', function() {
                this.on('user_settings.user_id', 'users.id');
            })
            .where(filters)
    }

    findExistingUser(username, email) {
        return this.knex.from(this.tableName).where({username: username}).orWhere({email: email});
    }

    async verifyUser(username, password) {
        return this.findOne({username: username})
            .then(user => {
                if(!user.length) throw new Error("User not found");
                return user;
            }).then(user => {
                return Promise.all([user, AuthHelper.verifyPassword(password, user[0].password)])
            })
            .then(([user, isValid]) => {
                if(!isValid) throw new Error("Invalid password");
                return user;
            });
    }
}

export default UserModel;