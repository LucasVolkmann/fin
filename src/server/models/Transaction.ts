import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, RelationId } from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
    id?: number;

  @Index()
  @ManyToOne(() => User, (user) => user.transactions)
    user!: User;

  @Column({ type: 'double precision' })
    amount!: number;

  @Column({ length: 250 })
    details!: string;

  @CreateDateColumn()
    date!: Date;

  @Index()
  @ManyToOne(() => Category, (category) => category.transactions)
    category!: Category;

  @RelationId((transaction: Transaction) => transaction.category)
    categoryId!: number;
}