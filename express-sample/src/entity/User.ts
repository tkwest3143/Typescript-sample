import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Chat } from "./Chat";

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

    @OneToMany(() => Chat, chat => chat.user)
    chats: Chat[];

}
