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

  @Post('/write')
  @Render('write')
  async button(@Body() data) {
    return await this.boardService.create(data);
  }

  @Get('/write')
  @Render('write')
  write() {}

  @Get('/login')
  @Render('login')
  login() {}
}
