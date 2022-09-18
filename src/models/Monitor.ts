import {
    Model,
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    IsUrl
} from "sequelize-typescript";
import {User} from "./User.js";

@Table({
    paranoid: true
})
export class Monitor extends Model {
    @Column
    name: string

    @Column
    title: string;

    @Column
    description: string;

    @IsUrl
    @Column
    url: string;

    @ForeignKey(() => User)
    userId: number

    @BelongsTo(() => User) user: ReturnType<() => User>;
}