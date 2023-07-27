import { Controller, Get, Header } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('resto/v1/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Header('Cache-Control', 'public, max-age=604800')
  @Get()
  async findAll() {
    return { data: await this.menuService.findAll(), message: 'Done!' };
  }
}
