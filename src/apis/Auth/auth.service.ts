import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  setRefreshToken({ user, res, req }) {
    const refreshToken = this.jwtService.sign(
      {
        nickname: user.nickname,
        id: user.id,
        isserviceprovider: user.isserviceprovider,
        issocialuser: user.issocialuser,
        phone: user.phone,
        name: user.name,
      },
      { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '24h' },
    );
  }
}
