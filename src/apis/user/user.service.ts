import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUser.input';
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

  async findOne({ data }) {
    return await this.userRepository.findOne({
      where: {
        name: data,
      },
    });
  }

  async create({ hashedPwd, data }) {
    const { name, ...items } = data;
    const checkuser = await this.userRepository.findOne({
      where: {
        name: data.name,
      },
    });
    if (checkuser) throw new ConflictException('이미 등록된 유저입니다.');

    const result = await this.userRepository.save({
      ...data,
      pwd: hashedPwd,
    });
    return result;
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
