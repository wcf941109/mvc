import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../\bboard/entities/board.entity';

@Injectable()
export class UpdateService {
  constructor(
    @InjectRepository(Board)
    private readonly updateRepository: Repository<Board>, //
  ) {}

  async findOne(id) {
    return await this.updateRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(data) {
    const result = await this.updateRepository.update(
      { title: data.title },
      { content: data.content },
    );
    console.log(result);
    return result;
  }
}
