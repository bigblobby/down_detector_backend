import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import {IsEmail, Length} from "class-validator";
import {UserSettings} from "./UserSettings.js";
import bcrypt from "bcrypt";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    @Length(4, 20)
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({unique: true, nullable: false})
    @IsEmail({}, {message: "Email is not valid"})
    email: string;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column("text", {array: true, nullable: true})
    roles: string[];

    @Column({default: false})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => UserSettings, {
        cascade: true,
    })
    @JoinColumn()
    settings: UserSettings;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}