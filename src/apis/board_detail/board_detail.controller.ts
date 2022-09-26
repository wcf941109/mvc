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
import { Request } from 'express';
import { BoardDetailService } from './board_detail.service';
import * as jwt from 'jsonwebtoken';

@Controller('board_detail')
export class BoardDetailController {
  constructor(
    private readonly boarddetailService: BoardDetailService, //
  ) {}

  @Get('/:id')
  @Render('board_detail')
  async detail(
    @Param('id') id: string, //
    @Req() req: Request, //
  ) {
    const result = await this.boarddetailService.findOne(id);
    let accessToken = '';
    if (req.headers.cookie) {
      accessToken = req.headers.cookie.split('Token=')[1];
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

  @Delete('/')
  async deleteBoard(@Body() data) {
    console.log(data, '1111111111');
    const result = await this.boarddetailService.delete(data);
    console.log(result, '22222222222');
    return result;
  }
}
