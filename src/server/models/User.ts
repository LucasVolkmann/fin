import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @CreateDateColumn({default: () => 'NOW()'})
    registration_date!: string;

  constructor(
    name: string,
    email: string,
    password: string
  ) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }

}