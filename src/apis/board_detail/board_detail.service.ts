import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../\bboard/entities/board.entity';

@Injectable()
export class BoardDetailService {
  constructor(
    @InjectRepository(Board)
    private readonly boarddetailRepository: Repository<Board>, //
  ) {}

  async findOne(id) {
    return await this.boarddetailRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete({ res }) {
    const findDelete = await this.boarddetailRepository.findOne({
      where: { title: res.title },
    });
    const result = await this.boarddetailRepository.softDelete(findDelete);
    console.log('-------------');
    console.log(res);
    console.log(result);
    return result.affected ? true : false;
  }
}
