import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      redirect_uris: 'https://shootingbasketball00.shop/login/google',
      callbackURL: 'https://shootingbasketball00.shop/login/google',

      scope: ['email', 'profile'],
    });
  }

  validate(_, __, profile) {
    console.log(profile, '========================');
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
    };
  }
}
