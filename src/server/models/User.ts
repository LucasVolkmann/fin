import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, DeleteDateColumn, OneToMany } from 'typeorm';
import { Category } from './Category';
import { Transaction } from './Transaction';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id?: number;

  @Column({ length: 100 })
    username!: string;

  @Index()
  @Column({ unique: true, length: 100 })
    email!: string;

  @Column({ length: 100 })
    password!: string;

  @OneToMany(() => Category, (category) => category.user)
    categories?: Category[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions?: Transaction[];

  @CreateDateColumn({default: () => process.env.NODE_ENV == 'dev?'? 'NOW()' : 'CURRENT_TIMESTAMP'})
    registration_date!: string;

  @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: string;

}