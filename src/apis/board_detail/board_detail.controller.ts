import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { BoardDetailService } from './board_detail.service';

@Controller('board_detail')
export class BoardDetailController {
  constructor(
    private readonly boarddetailService: BoardDetailService, //
  ) {}

  @Get('/:id')
  @Render('board_detail')
  async detail(@Param('id') id: string) {
    const result = await this.boarddetailService.findOne(id);
    return { data: result };
  }

  @Delete('/:id')
  async deleteBoard(@Res() res) {
    return await this.boarddetailService.delete({ res });
  }
}
