import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find() {
    return await this.userRepository.find({
      order: { id: 'desc' },
    });
  }

  async findOne(id) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(data) {
    console.log('----------');
    return await this.userRepository.save(data);
  }

  // async update(data) {
  //   const result = await this.userRepository.update(
  //     { title: data.title },
  //     { content: data.content },
  //   );
  //   console.log(result);
  //   return result;
  //   // if (result.affected) {
  //   //   return await this.boardRepository.findOne(data.id);
  //   // } else {
  //   //   throw new ConflictException('업데이트 실패했습니다.');
  //   // }
  // }

  async delete({ id }) {
    const result = await this.userRepository.softDelete({ id });
    console.log('dsdasdasdads');
    return result;
    // return result.affected ? true : false;
  }
}