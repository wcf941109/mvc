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
  //
  token({ user, res, req }) {
    const refreshToken = this.jwtService.sign(
      { name: user.name },
      { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '24h' },
    );
    console.log(refreshToken, '리프레쉬토큰1');
    const whiteList = ['http://localhost:3000/'];
    const origin = req.headers.origin;
    if (whiteList.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.cookie('refreshToken', refreshToken);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      {
        name: user.name,
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
        name: req.user.name,
      });
    }

    this.token({ user, res, req });
    res.redirect('http://localhost:3000');
    return user;
  }

  async logout({ req, res }) {
    const token = req.headers.cookie.replace('refreshToken=', '');
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
      res.cookie('refreshToken', '');
      res.redirect('http://localhost:3000/home');
      return '로그아웃 성공';
    } catch {
      throw new UnauthorizedException();
    }
  }
}
