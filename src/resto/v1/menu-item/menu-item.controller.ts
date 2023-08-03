import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemCreateDto } from './dtos/create.dto';
import { UpdateMenuItemDto } from './dtos/update.dto';
import { FastifyRequest } from 'fastify';

@Controller('resto/v1/menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  async create(
    @Body() createMenuItemDto: MenuItemCreateDto,
    @Req() req: FastifyRequest,
  ) {
    try {
      const response = await this.menuItemService.create(createMenuItemDto);

      return response;
    } catch (error) {
      req.log.error(error, 'Failed to create new MenuItem');

      throw new HttpException(
        `Failed to create MenuItem: ${error}`,
        error.code === 11000 ? HttpStatus.CONFLICT : HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.update(+id, updateMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemService.remove(+id);
  }
}
