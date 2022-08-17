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
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;
    return await this.boardRepository.save({
      title: data.title,
      content: data.content,
      createdAt: currentDate,
    });
  }

  async delete(data) {
    const result = await this.boardRepository.softDelete(data);
    return result.affected ? true : false;
  }
}
