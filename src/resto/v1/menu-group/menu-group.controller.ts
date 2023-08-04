import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { MenuGroupService } from './menu-group.service';
import { CreateMenuGroupDto } from './dtos/create-menu-group.dto';
import { ResponseMenuGroupDto } from './dtos/response-menu-group.dto';
import { FastifyRequest } from 'fastify';
import { ApiResponse } from '@nestjs/swagger';

@Controller('resto/v1/menu-groups')
export class MenuGroupController {
  constructor(private readonly menuGroupService: MenuGroupService) {}

  @ApiResponse({
    status: 201,
    description: '',
    type: ResponseMenuGroupDto,
  })
  @Post()
  async create(
    @Body() createMenuGroupDto: CreateMenuGroupDto,
    @Request() req: FastifyRequest,
  ): Promise<ResponseMenuGroupDto> {
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

  @ApiResponse({
    status: 200,
    description: '',
    type: [ResponseMenuGroupDto],
  })
  @Get()
  findAll(): Promise<ResponseMenuGroupDto[]> {
    return this.menuGroupService.findAll();
  }
}
