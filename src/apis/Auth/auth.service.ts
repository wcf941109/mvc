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
import * as dotenv from 'dotenv';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheMananger: Cache,
    private readonly userService: UserService,
  ) {}

  setRefreshToken({ user, res, req }) {
    const refreshToken = this.jwtService.sign(
      {
        nickname: user.nickname,
      },
      { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '24h' },
    );
    console.log(refreshToken, '리프레쉬토큰1');
    const whiteList = ['http://localhost:3000/'];
    const origin = req.headers.origin;
    if (whiteList.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.cookie('refreshToken', refreshToken); // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, FETCH');
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}`,
    // path=/; domain=localhost:3000; SameSite=None; Secure; httpOnly;,
    // );
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
      },
      { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '1h' },
    );
  }

  async getUserInfo(req, res) {
    let user = await this.userRepository.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (!user) {
      user = await this.userRepository.save({
        email: req.user.email,
        nickname: req.user.nickname,
      });
    }

    this.setRefreshToken({ user, res, req });
    res.redirect('http://localhost:3000');
    return user;
  }

  async saveToken({ accessToken, refreshToken }) {
    const verifyAccess: any = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_KEY,
    );
    const verifyRefresh: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
    );

    try {
      // 토큰 저장
      const saveAccess = await this.cacheMananger.set(
        `accessToken:${accessToken}`,
        'accessToken',
        {
          ttl: verifyAccess.exp - verifyAccess.iat,
        },
      );
      const saveRefresh = await this.cacheMananger.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: verifyRefresh.exp - verifyRefresh.iat,
        },
      );

      if (saveAccess === 'OK' && saveRefresh === 'OK') return true;
    } catch (error) {
      throw new ConflictException('토큰을 저장하지 못했습니다!!', error);
    }
  }
}
