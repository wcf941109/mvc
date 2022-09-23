import { Controller, Get, Render, Req } from '@nestjs/common';
import { ShootingService } from './shooting.service';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Controller('shooting')
export class ShootingController {
  constructor(private readonly shootingService: ShootingService) {}

  @Get('/')
  @Render('shooting')
  async shooting(
    @Req() req: Request, //
  ) {
    const result = await this.shootingService.find();
    let accessToken = '';
    if (req.headers.cookie) {
      accessToken = req.headers.cookie.split('refreshToken=')[1];
    } else {
      return { nickname: '', data: result };
    }
    if (accessToken === '') {
      return { nickname: '', data: result };
    } else if (accessToken !== undefined) {
      const checkToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_KEY);
      return { nickname: checkToken['nickname'], data: result };
    } else {
      return { nickname: '', data: result };
    }
  }
}
