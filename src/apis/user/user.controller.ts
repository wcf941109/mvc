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
  async createUser(
    // @Body() createUserInput: CreateUserInput, //
    @Body() data,
  ) {
    const { pwd, ...userdata } = data;
    const hashedPwd = await bcrypt.hash(pwd, 10);
    return this.userService.create({ hashedPwd, data });
  }
}
