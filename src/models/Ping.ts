import {
    Model,
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';

import {Monitor} from './Monitor.js';

@Table({
    paranoid: true,
    freezeTableName: true
})
export class Ping extends Model {

    @Column
    status: number;

    @Column
    statusCode: number;

    @Column
    responseTime: string;

    @Column
    url: string;

    @Column(DataType.TEXT)
    message: string;

    @Column(DataType.DATE)
    date: Date;

    @Column(DataType.JSON)
    headers: JSON;

    @ForeignKey(() => Monitor)
    monitorId: number;

    @BelongsTo(() => Monitor) monitor: ReturnType<() => Monitor>;
}