import {
    Model,
    Column,
    Table,
    AllowNull,
    HasOne,
    HasMany,
    DataType,
    Default,
    BeforeCreate
} from "sequelize-typescript";
import passwordHelper from "../helpers/password/index.js";
import {UserSettings} from "./UserSettings.js";
import {Monitor} from "./Monitor.js";
import {Group} from "./Group.js";

@Table({paranoid: true})
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
    @Column(DataType.ENUM('USER', 'ADMIN'))
    roles: string;

    @BeforeCreate
    static async hashPassword(user){
        user.password = await passwordHelper.hashPassword(user.password);
    }

    @HasOne(() => UserSettings) settings: ReturnType<() => UserSettings>
    @HasMany(() => Monitor) monitors: ReturnType<() => Monitor[]>
    @HasMany(() => Group) groups: ReturnType<() => Group[]>
}
