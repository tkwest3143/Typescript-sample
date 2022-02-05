import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Chat } from "./Chat";
import { Friend } from "./Friend";

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

    @OneToMany(() => Friend, friend => friend.friend)
    friends: Friend[];

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;

}
