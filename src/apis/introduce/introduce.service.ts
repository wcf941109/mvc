import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from '../home/entities/home.entity';

@Injectable()
export class IntroduceService {
  constructor(
    @InjectRepository(Home)
    private readonly homeRepository: Repository<Home>,
  ) {}
}
