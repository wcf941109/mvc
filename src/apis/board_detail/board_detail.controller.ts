import { Controller, Get, Param, Render } from '@nestjs/common';
import { BoardDetailService } from './board_detail.service';

@Controller('board_detail')
export class BoardDetailController {
  constructor(
    private readonly boarddetailService: BoardDetailService, //
  ) {}

  @Get('/board_detail')
  @Render('board_detail')
  board_detail() {}

  @Get('/:id')
  @Render('board_detail')
  async detail(@Param('id') id: string) {
    const result = await this.boarddetailService.findOne(id);
    return { data: result };
  }
}
