import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  async find() {
    return await this.loginRepository.find();
  }
  async findOne(id) {
    return await this.loginRepository.findOne({
      where: {
        id,
      },
    });
  }
}
