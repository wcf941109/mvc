import { Controller, Get, Param, Post, Render, Req } from '@nestjs/common';
import { IntroduceService } from './introduce.service';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Controller('introduce')
export class MainController {
  constructor(private readonly introduceService: IntroduceService) {}

  @Get('/')
  @Render('introduce')
  async introduce() {}

  @Post('/')
  @Render('introduce')
  async home(
    @Req() req: Request, //
  ) {
    let accessToken = '';
    console.log(req);
    // if (req.headers.cookie) {
    //   accessToken = req.headers.cookie.split('refreshToken=')[1];
    // } else {
    //   return { nickname: '' };
    // }
    // if (accessToken === '') {
    //   return { nickname: '' };
    // } else if (accessToken !== undefined) {
    //   const checkToken = jwt.verify(accessToken, 'myRefreshkey');
    //   return { nickname: checkToken['nickname'] };
    // } else {
    //   return { nickname: '' };
    // }
  }
}
