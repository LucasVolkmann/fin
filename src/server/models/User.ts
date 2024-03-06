import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, Index } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ length: 100 })
    username: string;

  @Index()
  @Column({ unique: true, length: 100 })
    email: string;

  @Column({ length: 100 })
    password: string;

  @CreateDateColumn({default: () => 'NOW()'})
    registration_date!: string;

  constructor(
    username: string,
    email: string,
    password: string
  ) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
  }

}