import {
    Model,
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    Default,
    DefaultScope
} from 'sequelize-typescript';
import {User} from './User.js';

@DefaultScope(() => ({
    attributes: ['theme']
}))
@Table({
    freezeTableName: true
})
export class UserSettings extends Model {

    @Default('light')
    @Column
    theme: string;

    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User) user: ReturnType<() => User>;
}