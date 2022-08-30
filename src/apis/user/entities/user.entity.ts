import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  pwd: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
