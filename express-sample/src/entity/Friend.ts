import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Friend extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => User, (user) => user.friends)
  friend: User;

  @Column({ default: null })
  deletedAt: Date;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
