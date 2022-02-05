import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Site extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column()
  name: string;
  @Column()
  url: string;
  @Column()
  selectorItem: string;
  @Column()
  selectorItemLink: string;
  @Column()
  selectorItemTitle: string;
  @Column()
  selectorItemPrice: string;
  @Column()
  selectorItemStatus: string;
}
