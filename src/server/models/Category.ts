import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
    id?: number;

  @Index()
  @Column({ length: 100 })
    name: string;

  @ManyToOne(() => User, (user) => user.categories)
    user: User;

  constructor(
    name: string,
    user: User,
  ) {
    this.name = name;
    this.user = user;
  }

}