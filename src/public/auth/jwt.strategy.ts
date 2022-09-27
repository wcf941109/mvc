import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { Cache } from 'cache-manager';
import * as dotenv from 'dotenv';

dotenv.config();

export class JwtTokenStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, //
  ) {
    super({
      jwtFromRequest: (req) => {
        try {
          const cookie = req.headers.cookie;
          const Token = cookie.replace('refreshToken=', '');
          return Token;
        } catch (error) {
          console.log(error);
        }
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const Token = req.headers.cookie.split('=')[1];

    const hasToken = await this.cacheManager.get(`refreshToken:${Token}`);
    if (hasToken) throw new UnauthorizedException('로그인 후 사용해주세요!');

    return {
      name: payload.name,
      id: payload.id,
    };
  }
}
