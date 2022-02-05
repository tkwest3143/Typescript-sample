import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class Chat extends BaseEntity {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    comment: string;

    @ManyToOne(()=>User,user=>user.chats)
    contributor:User;

    @ManyToOne(()=>Room,room=>room.chats)
    room:Room;

    @Column({default: null})
    deletedAt:Date;

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;

}
