import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  userId: string;

  @Column()
  email: string;

  @Column()
  content: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  // @Transform((createdAt) => moment(createdAt).format('YYYY/MM/DD'))
  @Column()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
