import { Column } from 'typeorm';

export class UpdateBoardInput {
  @Column()
  name: string;

  @Column({ default: ' ' })
  title: string;

  @Column()
  content: string;
}
