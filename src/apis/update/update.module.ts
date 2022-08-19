import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../\bboard/entities/board.entity';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}
