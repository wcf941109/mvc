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

@Controller('')
export class UserController {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Get('/signUpUser')
  @Render('signUpUser')
  sign() {}

  @Post('/signUpUser')
  async createUser(@Body() data) {
    // const { pwd, ...userInfo } = createUserInput;
    console.log(data, '1111111111');

    // const hashedPassword = await bcrypt.hash(pwd, 10);
    return this.userService.create(data);
  }
}
