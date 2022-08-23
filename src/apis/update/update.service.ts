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

  async update({ id, UpdateBoardInput }) {
    // const { title, ...items } = UpdateBoardInput;
    // return await this.updateRepository.update(
    //   { title: data.title },
    //   { content: data.content },
    // );
    const findUpdate = await this.updateRepository.findOne({
      where: { id },
    });

    // console.log(findUpdate, '12313123123123213');
    // const result = await this.updateRepository.save({
    //   ...findUpdate,
    //   ...UpdateBoardInput,
    // });
    // console.log(result, '===================');

    const result = await this.updateRepository.save({
      ...findUpdate,
      ...UpdateBoardInput,
    });
    console.log('---------------');
    console.log(result);
    return result;
  }
}
