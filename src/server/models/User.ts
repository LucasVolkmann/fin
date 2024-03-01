import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ length: 100 })
    username: string;

  @Column({ unique: true })
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