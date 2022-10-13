import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Render,
  Req,
  UnprocessableEntityException,
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
    @Query() query: string,
    @Req() req: Request, //
  ) {
    const result = await this.boardService.find();
    let accessToken, name;
    if (req.headers.cookie) {
      try {
        accessToken = req.headers.cookie.split('refreshToken=')[1];
        name = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY)['name'];
      } catch {
        name = '';
      }
    } else {
      name = '';
    }

    const count = await this.boardService.count();
    const page = await this.boardService.findPage({ page: query['id'] });

    return {
      pageCount: Math.ceil(count / 10),
      name,
      data: page,
      currentPage: query['id'],
    };
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

  // @Get('/write')
  // @Render('write')
  // async write(
  //   @Param('id') id: string,
  //   @Req() req: Request, //
  // ) {
  //   const result = await this.boardService.findOne(id);
  //   let accessToken = '';
  //   if (req.headers.cookie) {
  //     accessToken = req.headers.cookie.split('refreshToken=')[1];
  //   } else {
  //     return { name: '', data: result };
  //   }
  //   if (accessToken === '') {
  //     return { name: '', data: result };
  //   } else if (accessToken !== undefined) {
  //     const checkToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY);
  //     return { name: checkToken['name'], data: result };
  //   } else {
  //     return { name: '', data: result };
  //   }
  // }

  @Get('/write')
  @Render('write')
  write(
    @Req() req: Request, //
  ) {
    if (
      req.headers.cookie === undefined ||
      req.headers.cookie === 'refreshToken='
    ) {
      req.res.redirect('/login');
    } else {
      const checkToken = jwt.verify(
        req.headers.cookie.split('refreshToken=')[1],
        process.env.REFRESH_TOKEN_KEY,
      );
      return { name: checkToken['name'] };
    }
  }

  @Post('/write')
  async loginUser(
    // @Body() data, //
    @Req() req: Request,
  ) {
    if (
      req.headers.cookie === undefined ||
      req.headers.cookie === 'refreshToken='
    ) {
      throw new UnprocessableEntityException('로그인 후 이용가능 합니다.');
      // req.res.redirect('/login');
    } else {
      const checkToken = jwt.verify(
        req.headers.cookie.split('refreshToken=')[1],
        process.env.KEY,
      );
      return { name: checkToken['name'] };
    }
  }

  @Post('board')
  async post() {}

  @Get('/findid')
  @Render('findid')
  async findid() {}

  @Get('/findpw')
  @Render('findpw')
  async findpw() {}

  // @Get('/board_detail/update/:id')
  // @Render('update')
  // async detail(
  //   @Param('id') id: string,
  //   @Req() req: Request, //
  // ) {
  //   console.log(req, '---------');
  //   const result = await this.boardService.findOne(id);
  //   let accessToken = '';
  //   if (req.headers.cookie) {
  //     accessToken = req.headers.cookie.split('refreshToken=')[1];
  //   } else {
  //     return { name: '', data: result };
  //   }
  //   if (accessToken === '') {
  //     return { name: '', data: result };
  //   } else if (accessToken !== undefined) {
  //     const checkToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY);
  //     return { name: checkToken['name'], data: result };
  //   } else {
  //     return { name: '', data: result };
  //   }
  // }
}
