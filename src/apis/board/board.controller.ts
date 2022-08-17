import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
  constructor(
    private readonly boardService: BoardService, //
  ) {}

  @Get('/board')
  @Render('board')
  async board() {
    const result = await this.boardService.find();
    return { data: result };
  }

  @Post('/board')
  async button(@Body() data) {
    return await this.boardService.create(data);
  }

  @Post('/board')
  async delete(@Body() data) {
    return await this.boardService.delete(data);
  }

  @Get('/write')
  @Render('write')
  write() {}
}
