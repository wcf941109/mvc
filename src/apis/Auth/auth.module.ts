import { CacheModule, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { JwtGoogleStrategy } from 'src/public/auth/jwt-social-google.strategy';
import { JwtNaverStrategy } from 'src/public/auth/jwt-social-naver.strategy';
import { JwtKaKaoStrategy } from 'src/public/auth/jwt-social-kakao.strategy';
import { JwtTokenStrategy } from 'src/public/auth/jwt.strategy';

dotenv.config();

@Module({
  imports: [
    CacheModule.register(),
    JwtModule.register({
      secret: process.env.REFRESH_TOKEN_KEY,
    }), //
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService, //
    UserService,
    JwtService,
    JwtTokenStrategy,
    JwtGoogleStrategy,
    JwtKaKaoStrategy,
    JwtNaverStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
