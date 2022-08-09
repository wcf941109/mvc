import { Controller, Get, Render } from '@nestjs/common';
import { ShootingService } from './shooting.service';

@Controller('shooting')
export class ShootingController {
  constructor(private readonly shootingService: ShootingService) {}

  @Get('/')
  @Render('shooting')
  async shooting() {
    // const result = await this.shootingService.find();
    // return { data: result };
  }
}
