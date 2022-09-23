import { Column } from 'typeorm';

export class CreateUserInput {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  pwd: string;

  @Column()
  phone: string;
}
