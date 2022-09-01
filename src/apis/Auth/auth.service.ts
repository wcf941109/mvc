import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // // @Inject(CACHE_MANAGER) // private readonly cacheMananger: Cache,
  ) {}

  setRefreshToken({ findUser, res, req }) {
    const refreshToken = this.jwtService.sign(
      {
        nickname: findUser.nickname,
        id: findUser.id,
        email: findUser.email,
        pwd: findUser.pwd,
        phone: findUser.phone,
      },
      { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '24h' },
    );
    const whiteList = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (whiteList.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.wawoong.shop; SameSite=None; Secure; httpOnly;`,
    );
  }
  validationToken({ accessToken, refreshToken }) {
    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        '유효하지 않은 소셜 엑세스 토큰입니다',
        error,
      );
    }
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      {
        nickname: user.nickname,
        id: user.id,
        email: user.email,
        pwd: user.pwd,
        phone: user.phone,
      },
      { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '1h' },
    );
  }

  // async saveToken({ accessToken, refreshToken }) {
  //   const verifyAccess: any = jwt.verify(
  //     accessToken,
  //     process.env.ACCESS_TOKEN_KEY,
  //   );
  //   const verifyRefresh: any = jwt.verify(
  //     refreshToken,
  //     process.env.REFRESH_TOKEN_KEY,
  //   );

  //   try {
  //     // 토큰 저장
  //     const saveAccess = await this.cacheMananger.set(
  //       `accessToken:${accessToken}`,
  //       'accessToken',
  //       {
  //         ttl: verifyAccess.exp - verifyAccess.iat,
  //       },
  //     );
  //     const saveRefresh = await this.cacheMananger.set(
  //       `refreshToken:${refreshToken}`,
  //       'refreshToken',
  //       {
  //         ttl: verifyRefresh.exp - verifyRefresh.iat,
  //       },
  //     );

  //     if (saveAccess === 'OK' && saveRefresh === 'OK') return true;
  //   } catch (error) {
  //     throw new ConflictException('토큰을 저장하지 못했습니다!!', error);
  //   }
  // }
}
