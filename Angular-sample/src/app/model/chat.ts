import { Room } from "./room";
import { User } from "./user";

export class Chat {

    id!: number;

    comment!: string;

    contributor!: User;

    room!: Room;

    deletedAt!: Date;

    createdAt!: Date;

    updatedAt!: Date;

}