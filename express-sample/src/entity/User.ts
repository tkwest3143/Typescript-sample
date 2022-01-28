import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Chat } from "./Chat";
import { Room } from "./Room";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column()
    birthDate: Date;

    @Column()
    email: string;

    @OneToMany(() => Chat, chat => chat.contributor)
    chats: Chat[];

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;

}
