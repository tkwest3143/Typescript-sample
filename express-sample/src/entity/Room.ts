import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@Entity()
export class Room extends BaseEntity {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    name: string;
    @Column()
    memo: string;

    @OneToOne(() => User)
    @JoinColumn()
    manager: User;

    @ManyToMany(() => User)
    @JoinTable()
    participant: User[];

    @OneToMany(() => Chat, chat => chat.room)
    chats: Chat[];

    @Column({ default: null })
    deletedAt: Date;

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;

}

