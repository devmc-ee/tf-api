import { Controller, Get, Header } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseMenuDto } from './dto/response-menu.dto';

@Controller('resto/v1/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiResponse({
    status: 200,
    description: '',
    type: [ResponseMenuDto],
  })
  @Header('Cache-Control', 'public, max-age=604800')
  @Get()
  async findAll(): Promise<ResponseMenuDto[]> {
    return await this.menuService.findAll();
  }
}
