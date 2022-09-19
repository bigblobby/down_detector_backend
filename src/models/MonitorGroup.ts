import {
    Model,
    Column,
    Table,
    ForeignKey,
} from 'sequelize-typescript';

import {Monitor} from './Monitor.js';
import {Group} from './Group.js';

@Table({
    paranoid: true
})
export class MonitorGroup extends Model {

    @ForeignKey(() => Monitor)
    @Column
    monitorId: number;

    @ForeignKey(() => Group)
    @Column
    groupId: number;
}