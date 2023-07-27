import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuGroupService } from './menu-group.service';
import { CreateMenuGroupDto } from './dto/create-menu-group.dto';
import { UpdateMenuGroupDto } from './dto/update-menu-group.dto';

@Controller('resto/v1/menu-groups')
export class MenuGroupController {
  constructor(private readonly menuGroupService: MenuGroupService) {}

  @Post()
  async create(@Body() createMenuGroupDto: CreateMenuGroupDto) {
    return await this.menuGroupService.create(createMenuGroupDto);
  }

  @Get()
  async findAll() {
    return await this.menuGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuGroupDto: UpdateMenuGroupDto,
  ) {
    return this.menuGroupService.update(+id, updateMenuGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuGroupService.remove(+id);
  }
}
