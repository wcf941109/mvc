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

  async delete(data) {
    const result = await this.boarddetailRepository.softDelete({ id: data.id });
    console.log('-------------');
    console.log(data);
    return result;
    // eturn result.affected ? true : false;
  }
}
