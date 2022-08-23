import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { CreateBoardInput } from '../\bboard/dto/createBoard.input';
import { UpdateBoardInput } from '../\bboard/dto/updateBoard.input';
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
  async update(
    @Param('id') id: string, //
    @Body() UpdateBoardInput,
  ) {
    return await this.updateService.update({ id, UpdateBoardInput });
  }
}
