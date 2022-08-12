import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../\bboard/entities/board.entity';
import { Write } from './entities/write.entity';

@Injectable()
export class WriteService {
  constructor(
    @InjectRepository(Write)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async find() {
    return await this.boardRepository.find();
  }

  async create(data) {
    return await this.boardRepository.save({
      title: data.title,
      content: data.content,
    });
  }
}
