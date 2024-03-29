import {
    Model,
    Column,
    Table,
    AllowNull,
    HasOne,
    HasMany,
    DataType,
    Default,
    BeforeCreate,
    BeforeUpdate,
    DefaultScope,
    Scopes
} from 'sequelize-typescript';

import hashHelper from '../helpers/hash/index.js';
import {UserSettings} from './UserSettings.js';
import {Monitor} from './Monitor.js';
import {Group} from './Group.js';

@DefaultScope(() => ({
    attributes: ['id', 'username', 'password', 'email', 'firstName', 'lastName'],
    nest: true,
    include: [UserSettings]
}))
@Scopes(() => ({
    full: {
        nest: true,
        include: [UserSettings]
    }
}))
@Table({
    paranoid: true,
    freezeTableName: true
})
export class User extends Model {
    @AllowNull(false)
    @Column({})
    username: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    email: string;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Default('USER')
    @Column
    roles: string;

    @Default(['GET', 'POST', 'PUT', 'DELETE'])
    @Column(DataType.JSON)
    permissions: JSON;

    @Column(DataType.JSON)
    allowedActions: JSON;

    @Default(false)
    @Column
    isVerified: boolean;

    @Default(true)
    @Column
    isEnabled: boolean;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(user, done){
        if(!user.changed('password')) return done();
        const password = await hashHelper.hash(user.get('password'));
        user.set('password', password);
    }

    @HasOne(() => UserSettings) settings: ReturnType<() => UserSettings>;
    @HasMany(() => Monitor) monitors: ReturnType<() => Monitor[]>;
    @HasMany(() => Group) groups: ReturnType<() => Group[]>;

    toJSON<T extends any>(): T {
        const values = Object.assign({}, this.get());

        delete values.password;
        // delete values.id;
        delete values.permissions;
        delete values.allowedActions;
        delete values.isVerified;
        delete values.isEnabled;
        delete values.createdAt
        delete values.updatedAt;
        delete values.deletedAt;
        return values;
    }
}
