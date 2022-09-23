import { Column } from 'typeorm';

export class CreateBoardInput {
  @Column()
  name: string;

  @Column({ default: ' ' })
  title: string;

  @Column()
  content: string;
}
