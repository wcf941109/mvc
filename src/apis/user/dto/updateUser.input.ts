import { Column } from 'typeorm';

export class UpdateUserInput {
  @Column()
  userId: string;

  @Column()
  email: string;

  @Column()
  content: string;

  @Column()
  pwd: string;

  @Column()
  phone: string;
}
