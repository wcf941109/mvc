import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
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

  // @Put('update')
  // async update(@Body() data) {
  //   return await this.boardService.update(data);
  // }

  @Post('/board')
  async delete(@Body() data) {
    return await this.boardService.delete(data);
  }

  @Get('/write')
  @Render('write')
  write() {}

  // @Get('/update')
  // @Render('update')
  // updat1() {}

  // @Get('/update')
  // @Render('update')
  // async updatepage(@Param('id') id: string) {
  //   const result = await this.boardService.findOne(id);
  //   return { data: result };
  // }

  @Get('/board_detail/update/:id')
  @Render('update')
  async detail(@Param('id') id: string) {
    const result = await this.boardService.findOne(id);
    return { data: result };
  }
}
