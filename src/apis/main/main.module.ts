import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from '../home/entities/home.entity';
import { MainController } from './main.controller';
import { mainService } from './main.service';

@Module({
  imports: [TypeOrmModule.forFeature([Home])],
  controllers: [MainController],
  providers: [mainService],
})
export class MainModule {}
