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
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Post('/login')
  async Login(
    @Param('nickname') nickname: string, //
    @Param('pwd') pwd: string,
    @Body() context: IContext,
  ) {
    // 1. 로그인 @@
    const user = await this.userService.findOne({ nickname });

    // 2. 일치하는 유저가 없으면?! 에러 던지기!!!
    if (!user) throw new UnprocessableEntityException('아이디가 없습니다.');

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?! 에러 던지기!!!
    const isAuth = await bcrypt.compare(pwd, user.pwd);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    this.authService.setRefreshToken({
      user,
      res: context.res,
      req: context.req,
    });

    // 5. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.authService.getAccessToken({ user });
  }
}
