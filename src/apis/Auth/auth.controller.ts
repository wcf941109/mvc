import {
  Body,
  CACHE_MANAGER,
  Controller,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Request, Response } from 'express';

// interface IContext {
//   req: Request;
//   res: Response;
// }

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService, // @Inject(CACHE_MANAGER) // private readonly cacheManager: Cache,
  ) {}

  @Post('/login')
  async Login(
    @Body() data, //
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // 1. 로그인 @@
    console.log(data, '인풋데이터');
    const nickname = data.nickname;
    const pwd = data.pwd;

    const user = await this.userService.findOne({ data: nickname });
    if (!user) {
      throw new UnprocessableEntityException('아이디가 없습니다.');
    }

    const isAuth = await bcrypt.compare(pwd, user.pwd);
    console.log(isAuth, '333333333333333');

    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    await this.authService.setRefreshToken({
      user,
      res,
      req,
    });

    // // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    // const bbb = this.authService.setRefreshToken({
    //   user,
    //   res,
    //   req,
    // });

    // 5. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
    const accessToken = this.authService.getAccessToken({ user: user });
    console.log(accessToken, '1-1-1-1-1-1-1-1');
    res.send(accessToken);
  }
}
