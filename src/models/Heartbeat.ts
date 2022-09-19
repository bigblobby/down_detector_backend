import {
    Model,
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    IsUrl,
    DataType,
    BelongsToMany
} from 'sequelize-typescript';

@Table({
    paranoid: true
})
export class Heartbeat extends Model {

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
}