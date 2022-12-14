import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import 'dotenv/config';

export class JwtKaKaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: 'https://shootingbasketball00.shop/login/kakao',
    });
  }

  validate(_, __, profile) {
    console.log(profile, '===============');
    return {
      email: profile._json.kakao_account.email,
      name: profile.displayName,
    };
  }
}
