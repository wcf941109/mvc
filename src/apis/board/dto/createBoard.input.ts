import { Column } from 'typeorm';

export class CreateBoardInput {
  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  content: string;
}
