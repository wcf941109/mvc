import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async find() {
    return await this.boardRepository.find();
  }

  async create(data) {
    const result = await this.boardRepository.save({
      title: data.title,
      content: data.content,
    });
    return result;
  }
}
