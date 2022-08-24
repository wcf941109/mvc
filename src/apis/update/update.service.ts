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
    console.log(findUpdate);
    const result = await this.updateRepository.update(
      {
        id: findUpdate.id,
      },
      {
        ...UpdateBoardInput,
      },
    );
    console.log(result);
    return result;
  }
  // const date = new Date();
  // const yyyy = date.getFullYear();
  // const mm = String(date.getMonth() + 1).padStart(2, '0');
  // const dd = String(date.getDate()).padStart(2, '0');
  // const currentDate = `${yyyy}-${mm}-${dd}`;

  // const result = await this.updateRepository.save({
  //   id: data.id,
  //   name: data.name,
  //   title: data.title,
  //   content: data.content,
  //   createdAt: currentDate,
  // });
  // console.log('---------------');
  // console.log(data);
  // console.log(result);
}
