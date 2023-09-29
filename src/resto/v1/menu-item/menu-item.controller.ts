import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { FastifyRequest } from 'fastify';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseMenuItemDto } from './dtos/response-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('resto/v1/menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}
  @ApiResponse({
    status: 201,
    description: '',
    type: ResponseMenuItemDto,
  })
  @Post()
  async create(
    @Body() createMenuItemDto: CreateMenuItemDto,
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

  @ApiResponse({
    status: 200,
    description: '',
    type: ResponseMenuItemDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @Patch(':id')
  async update(
    @Body() updateMenuItemDto: UpdateMenuItemDto,
    @Param('id') id: string,
  ): Promise<ResponseMenuItemDto> {
    return await this.menuItemService.update(id, updateMenuItemDto);
  }

  @ApiResponse({
    status: 200,
    description: '',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.menuItemService.remove(id);
  }

  @ApiResponse({
    status: 200,
    description: '',
    type: [ResponseMenuItemDto],
  })
  @Get()
  findAll() {
    return this.menuItemService.findAll();
  }
}
