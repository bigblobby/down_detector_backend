import {
    Model,
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    DataType,
    BelongsToMany
} from 'sequelize-typescript';

import {User} from './User.js';
import {Monitor} from './Monitor.js';
import {MonitorGroup} from './MonitorGroup.js';

@Table({
    paranoid: true,
    freezeTableName: true
})
export class Group extends Model {

    @Column
    name: string

    @Column
    title: string;

    @Column(DataType.TEXT)
    description: string;

    @ForeignKey(() => User)
    userId: number

    @BelongsTo(() => User) user: ReturnType<() => User>;
    @BelongsToMany(() => Monitor, () => MonitorGroup) monitors: ReturnType<() => Monitor[]>;
}