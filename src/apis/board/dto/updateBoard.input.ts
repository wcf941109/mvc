import { Column } from 'typeorm';

export class UpdateBoardInput {
  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  content: string;
}
