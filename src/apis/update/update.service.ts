import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardInput } from '../\bboard/dto/createBoard.input';
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

  async update({ req, UpdateBoardInput }) {
    const findUpdate = await this.updateRepository.findOne({
      where: { title: req.body.title },
    });
    const result = await this.updateRepository.update(
      {
        id: findUpdate.id,
      },
      {
        ...UpdateBoardInput,
      },
    );
    return result;
  }
}
