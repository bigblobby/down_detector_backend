import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column("text", {array: true, nullable: true})
    roles: string[];

    @Column({default: false})
    isActive: boolean;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}