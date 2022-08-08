import { Controller, Get, Param, Render } from '@nestjs/common';
import { mainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: mainService) {}

  @Get('/:id')
  @Render('main')
  async main(@Param('id') id: string) {
    const result = await this.mainService.findOne(id);
    return { data: result };
  }
}
