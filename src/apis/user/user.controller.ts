import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { CreateUserInput } from './dto/createUser.input';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('/signup')
export class UserController {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Get('/')
  @Render('signup')
  sign() {}

  @Get('/signup')
  async createUser(
    @Body() createUserInput: CreateUserInput, //
  ) {
    const { pwd, ...userInfo } = createUserInput;
    console.log('1111111111');

    const hashedPassword = await bcrypt.hash(pwd, 10);
    return this.userService.create({ pwd: hashedPassword, userInfo });
  }
}
