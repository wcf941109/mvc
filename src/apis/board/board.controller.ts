import { Controller, Get, Param, Render } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('main')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/:id')
  @Render('main')
  async main(@Param('id') id: string) {
    const result = await this.boardService.findOne(id);
    return { data: result };
  }
}
