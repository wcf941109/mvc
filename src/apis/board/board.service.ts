import { ConflictException, Injectable } from '@nestjs/common';
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
    return await this.boardRepository.find({
      order: { id: 'desc' },
    });
  }

  async findOne(id) {
    return await this.boardRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(data) {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;
    return await this.boardRepository.save({
      name: data.name,
      title: data.title,
      content: data.content,
      createdAt: currentDate,
    });
  }

  async update(data) {
    const result = await this.boardRepository.update(
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

  async delete({ id }) {
    const result = await this.boardRepository.softDelete({ id });
    console.log('dsdasdasdads');
    return result;
    // return result.affected ? true : false;
  }

  async count() {
    return await this.boardRepository.count();
  }

  async findPage({ page }) {
    return await this.boardRepository.find({
      order: {
        id: 'DESC',
      },
      skip: (Number(page ?? 1) - 1) * 10,
      take: 10,
    });
  }
}
