import { Column } from 'typeorm';

export class UpdateUserInput {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  pwd: string;

  @Column()
  phone: string;
}
