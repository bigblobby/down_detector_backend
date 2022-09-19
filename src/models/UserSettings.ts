import {
    Model,
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    Default
} from 'sequelize-typescript';
import {User} from './User.js';

@Table
export class UserSettings extends Model {

    @Default('light')
    @Column
    theme: string;

    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User) user: ReturnType<() => User>;
}