import {
  Body,
  CACHE_MANAGER,
  Controller,
  Inject,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';

interface IContext {
  req: Request;
  res: Response;
}

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService, // @Inject(CACHE_MANAGER) // private readonly cacheManager: Cache,
  ) {}

  @Post('/login')
  async Login(
    @Body() data, //
  ) {
    // 1. 로그인 @@
    const nickname = data[0];
    const pwd = data[1];
    const user = await this.userService.findOne(nickname);
    console.log(data, '1111111111111111111');
    console.log(pwd, '2222222222222222222');
    if (!user) throw new UnprocessableEntityException('아이디가 없습니다.');
    const isAuth = await bcrypt.compare(pwd, user.pwd);
    console.log(user.pwd, '2222222222222222222');

    console.log(isAuth, '333333333333333');

    // // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    // const bbb = this.authService.setRefreshToken({
    //   findUser,
    //   res: context.res,
    //   req: context.req,
    // });

    // // 5. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
    // const aaa = this.authService.getAccessToken({ user: findUser });
    // return aaa;
  }
}
