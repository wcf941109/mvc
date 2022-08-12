import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { WriteService } from './write.service';

@Controller('write')
export class WriteController {
  constructor(private readonly writeService: WriteService) {}

  @Get('/')
  @Render('write')
  async write() {
    const result = await this.writeService.find();
    return { data: result };
  }

  @Post('/write')
  async button(@Body() data) {
    return await this.writeService.create(data);
  }
}
