import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Render,
  Req,
} from '@nestjs/common';
import { UpdateService } from './update.service';

@Controller('/board_detail/update')
export class UpdateController {
  constructor(
    private readonly updateService: UpdateService, //
  ) {}

  // @Post('/update')
  // @Render('update')
  // updatePage() {}

  @Get('/:id')
  @Render('update')
  async updatePageOpen(
    @Param('id') id: string, //
  ) {
    const result = await this.updateService.findOne(id);
    return { data: result };
  }

  @Put('/:id')
  async update(@Body() UpdateBoardInput, @Req() req) {
    return await this.updateService.update({ req, UpdateBoardInput });
  }
}
