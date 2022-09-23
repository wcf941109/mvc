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
import { Request } from 'express';
import { BoardService } from './board.service';
import * as jwt from 'jsonwebtoken';

@Controller()
export class BoardController {
  constructor(
    private readonly boardService: BoardService, //
  ) {}

  @Get('/board')
  @Render('board')
  async board(
    @Req() req: Request, //
  ) {
    const result = await this.boardService.find();
    let accessToken = '';
    if (req.headers.cookie) {
      accessToken = req.headers.cookie.split('refreshToken=')[1];
    } else {
      return { name: '', data: result };
    }
    if (accessToken === '') {
      return { name: '', data: result };
    } else if (accessToken !== undefined) {
      const checkToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY);
      return { name: checkToken['name'], data: result };
    } else {
      return { name: '', data: result };
    }
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
  async write(
    @Param('id') id: string,
    @Req() req: Request, //
  ) {
    const result = await this.boardService.findOne(id);
    let accessToken = '';
    if (req.headers.cookie) {
      accessToken = req.headers.cookie.split('refreshToken=')[1];
    } else {
      return { name: '', data: result };
    }
    if (accessToken === '') {
      return { name: '', data: result };
    } else if (accessToken !== undefined) {
      const checkToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY);
      return { name: checkToken['name'], data: result };
    } else {
      return { name: '', data: result };
    }
  }

  @Get('/findid')
  @Render('findid')
  async findid() {}

  @Get('/findpw')
  @Render('findpw')
  async findpw() {}

  @Get('/board_detail/update/:id')
  @Render('update')
  async detail(
    @Param('id') id: string,
    @Req() req: Request, //
  ) {
    const result = await this.boardService.findOne(id);
    let accessToken = '';
    if (req.headers.cookie) {
      accessToken = req.headers.cookie.split('refreshToken=')[1];
    } else {
      return { name: '', data: result };
    }
    if (accessToken === '') {
      return { name: '', data: result };
    } else if (accessToken !== undefined) {
      const checkToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY);
      return { name: checkToken['name'], data: result };
    } else {
      return { name: '', data: result };
    }
  }
}
