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

  //   async update({ req, data }) {
  //     const findUpdate = await this.updateRepository.findOne({
  //       where: { title: req.body.title },
  //     });
  //     const result = await this.updateRepository.update(
  //       {
  //         id: findUpdate.id,
  //       },
  //       {
  //         ...data,
  //       },
  //     );
  //     console.log(result, '2222222222');
  //     return result;
  //   }
  // }

  async update(data) {
    const result = await this.updateRepository.update(
      { title: data.title },
      { content: data.content },
    );
    console.log(result);
    return result;
    // if (result.affected) {
    //   return await this.boardRepository.findOne(data.id);
    // } else {
    //   throw new ConflictException('업데이트 실패했습니다.');
    // }
  }
}
