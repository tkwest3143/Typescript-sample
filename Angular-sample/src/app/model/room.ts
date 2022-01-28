import { Chat } from "./chat";
import { User } from "./user";

export class Room {

    id!: number;

    name!: string;
    memo!: string;

    manager!: User;

    participant!: User[];

    chats!: Chat[];

    deletedAt!: Date;

    createdAt!: Date;

    updatedAt!: Date;
}