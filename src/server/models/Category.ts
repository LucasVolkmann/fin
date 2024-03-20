import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, Check } from 'typeorm';
import { User } from './User';

@Entity()
@Check('LENGTH(name) >= 3')
@Index(['name', 'user'], { unique: true })
export class Category {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ length: 100, nullable: false })
    name!: string;

  @ManyToOne(() => User, (user) => user.categories, { nullable: false })
    user!: User;

  constructor(
    name: string,
    user: User,
  ) {
    this.name = name;
    this.user = user;
  }

}