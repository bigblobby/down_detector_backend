import {
    Model,
    Column,
    Table,
    BelongsTo,
    ForeignKey,
    BelongsToMany,
    IsUrl,
    DataType
} from "sequelize-typescript";
import {User} from "./User.js";
import {Group} from "./Group.js";
import {MonitorGroup} from "./MonitorGroup.js";

@Table({
    paranoid: true
})
export class Monitor extends Model {
    @Column
    name: string

    @Column
    title: string;

    @Column(DataType.TEXT)
    description: string;

    @IsUrl
    @Column
    url: string;

    @ForeignKey(() => User)
    userId: number

    @BelongsTo(() => User) user: ReturnType<() => User>;
    @BelongsToMany(() => Group, () => MonitorGroup) groups: ReturnType<() => Group[]>
}