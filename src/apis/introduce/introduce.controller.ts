import { Controller, Get, Param, Render } from '@nestjs/common';
import { IntroduceService } from './introduce.service';

@Controller('introduce')
export class MainController {
  constructor(private readonly introduceService: IntroduceService) {}

  @Get('/')
  @Render('introduce')
  async introduce() {}
}
