import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  Req,
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

  // @Delete('/board_detail/update/:id')
  // async deleteBoard(@Param('id') id: string) {
  //   return await this.boardService.delete({ id });
  // }

  @Get('/login')
  @Render('login')
  login() {}

  @Get('/write')
  @Render('write')
  write() {}

  @Get('/findid')
  @Render('findid')
  async findid() {}

  @Get('/findpw')
  @Render('findpw')
  async findpw() {}

  @Get('/board_detail/update/:id')
  @Render('update')
  async detail(@Param('id') id: string) {
    const result = await this.boardService.findOne(id);
    return { data: result };
  }
}
