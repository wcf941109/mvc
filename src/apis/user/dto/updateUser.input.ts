import { Column } from 'typeorm';

export class UpdateUserInput {
  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  pwd: string;

  @Column()
  phone: string;
}
