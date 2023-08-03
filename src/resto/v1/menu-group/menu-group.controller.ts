import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { MenuGroupService } from './menu-group.service';
import { CreateMenuGroupDto } from './dtos/create-menu-group.dto';
import { ResponseMenuGroupDto } from './dtos/response-menu-group.dto';
import { FastifyRequest } from 'fastify';

@Controller('resto/v1/menu-groups')
export class MenuGroupController {
  constructor(private readonly menuGroupService: MenuGroupService) {}

  @Post()
  async create(
    @Body() createMenuGroupDto: CreateMenuGroupDto,
    @Request() req: FastifyRequest,
  ) {
    try {
      return await this.menuGroupService.create(createMenuGroupDto);
    } catch (error) {
      req.log.error(error, 'Failed to create MenuGroup');

      throw new HttpException(
        `Failed to create MenuGroup: ${error}`,
        error.code === 11000 ? HttpStatus.CONFLICT : HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll(): Promise<ResponseMenuGroupDto[]> {
    return this.menuGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuGroupService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMenuGroupDto: UpdateMenuGroupDto,
  // ) {
  //   return this.menuGroupService.update(+id, updateMenuGroupDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuGroupService.remove(+id);
  }
}
