import { Controller, Get, Param, Post, Render, Req } from '@nestjs/common';
import { IntroduceService } from './introduce.service';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Controller('introduce')
export class MainController {
  constructor(private readonly introduceService: IntroduceService) {}

  @Get('/')
  @Render('introduce')
  async introduce(
    @Req() req: Request, //
  ) {
    let accessToken = '';
    if (req.headers.cookie) {
      accessToken = req.headers.cookie.split('refreshToken=')[1];
    } else {
      return { name: '' };
    }

    if (accessToken === '') {
      return { name: '' };
    } else if (accessToken !== undefined) {
      const checkToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY);
      return { name: checkToken['name'] };
    } else {
      return { name: '' };
    }
  }
}
