import {
    Model,
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    IsUrl,
    DataType
} from "sequelize-typescript";
import {User} from "./User.js";

@Table({
    paranoid: true
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
}