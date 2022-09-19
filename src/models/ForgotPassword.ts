import {
    Model,
    Column,
    Table,
    DataType,
    Unique,
} from 'sequelize-typescript';

@Table({
    freezeTableName: true
})
export class ForgotPassword extends Model {
    @Column
    token: string;

    @Unique
    @Column
    email: string;

    @Column(DataType.DATE)
    expiresAt: Date;
}