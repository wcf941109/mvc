import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Render,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateBoardInput } from '../\bboard/dto/updateBoard.input';
import { UpdateService } from './update.service';
import * as jwt from 'jsonwebtoken';

@Controller('update')
export class UpdateController {
  constructor(
    private readonly updateService: UpdateService, //
  ) {}

  // @Post('/update')
  // @Render('update')
  // updatePage() {}

  @Get('/:id')
  @Render('update')
  async updatePageOpen(
    @Param('id') id: string, //
    @Req() req: Request, //
  ) {
    const result = await this.updateService.findOne(id);
    let accessToken = '';
    if (req.headers.cookie) {
      accessToken = req.headers.cookie.split('refreshToken=')[1];
    } else {
      return { id, name: '', data: result };
    }
    if (accessToken === '') {
      return { id, name: '', data: result };
    } else if (accessToken !== undefined) {
      const checkToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY);
      return { id, name: checkToken['name'], data: result };
    } else {
      return { id, name: '', data: result };
    }
  }
  @Put('/')
  async update(
    @Body() data, //
  ) {
    console.log(data);
    return await this.updateService.update(data);
  }
}
