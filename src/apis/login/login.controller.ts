import { Controller, Get, Render } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('/')
  @Render('login')
  async login() {
    // const result = await this.shootingService.find();
    // return { data: result };
  }
}
