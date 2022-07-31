import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class UserSettings {
    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({default: "light"})
    theme: string;
}