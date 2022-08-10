import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from '../home/entities/home.entity';
import { MainController } from './introduce.controller';
import { IntroduceService } from './introduce.service';

@Module({
  imports: [TypeOrmModule.forFeature([Home])],
  controllers: [MainController],
  providers: [IntroduceService],
})
export class IntroduceModule {}
