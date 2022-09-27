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

  @Get('/home')
  @Render('home')
  async home(
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
