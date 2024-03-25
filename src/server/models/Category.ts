import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, Check, OneToMany } from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';

@Entity()
@Check('LENGTH(name) >= 3')
@Index(['name', 'user'], { unique: true })
export class Category {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ length: 100 })
    name!: string;

  @ManyToOne(() => User, (user) => user.categories)
    user!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions?: Transaction[];

}