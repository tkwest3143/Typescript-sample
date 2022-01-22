import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Chat extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @ManyToOne(()=>User,user=>user.chats)
    user:User;

    @CreateDateColumn()
    readonly createdAt: string;

    @UpdateDateColumn()
    readonly updatedAt: string;

}
