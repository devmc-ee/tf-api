import { Injectable } from '@nestjs/common';
import { MenuItemCreateDto } from './dtos/create.dto';
import { UpdateMenuItemDto } from './dtos/update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MenuItem } from './entities/menu-item.schema';
import { Model } from 'mongoose';
import { MenuItemResponseDto } from './dtos/response.dto';
import { IMenuItemResponse } from './menu-item.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
    private config: ConfigService,
  ) {}
  async create(
    createMenuItemDto: MenuItemCreateDto,
  ): Promise<IMenuItemResponse> {
    createMenuItemDto.price = Number.parseFloat(
      createMenuItemDto.price,
    ).toFixed(this.config.get('prices.precision'));

    const newMenuItem = new this.menuItemModel(createMenuItemDto);
    const menuItemDoc = await newMenuItem.save();

    return new MenuItemResponseDto(menuItemDoc.toObject());
  }

  async findAll(): Promise<IMenuItemResponse[]> {
    const menuItems = await this.menuItemModel.find().exec();
    return menuItems.map(
      (menuItemDoc) => new MenuItemResponseDto(menuItemDoc.toObject()),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} menuItem`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    return `This action updates a #${id} menuItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuItem`;
  }
}
