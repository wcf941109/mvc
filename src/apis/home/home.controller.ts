import { Body, Controller, Get, Post, Render, Req } from '@nestjs/common';
import { HomeService } from './home.service';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // @Get('/')
  // @Render('home')
  // async home() {
  //   const result = await this.homeService.find();
  //   console.log(result);
  //   return { data: result };
  // }

  @Get('/')
  @Render('home')
  async home(
    @Req() req: Request, //
  ) {
    let accessToken = '';
    console.log(req.headers.cookie, '-------------');
    if (req.headers.cookie) {
      accessToken = req.headers.cookie.split('refreshToken=')[1];
    } else {
      return { nickname: '' };
    }

    if (accessToken !== undefined) {
      const checkToken = jwt.verify(accessToken, 'myRefreshKey');
      return { nickname: checkToken['nickname'] };
    } else {
      return { nickname: '' };
    }
  }
}
