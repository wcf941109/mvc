import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shooting } from './entities/shooting.entity';

@Injectable()
export class ShootingService {
  constructor(
    @InjectRepository(Shooting)
    private readonly shootingRepository: Repository<Shooting>,
  ) {}

  async find() {
    return await this.shootingRepository.find();
  }
  async findOne(id) {
    return await this.shootingRepository.findOne({
      where: {
        id,
      },
    });
  }
}
