import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../\bboard/entities/board.entity';
import { BoardDetailController } from './board_detail.controller';
import { BoardDetailService } from './board_detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardDetailController],
  providers: [BoardDetailService],
})
export class BoardDetailModule {}
