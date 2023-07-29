import { Injectable } from '@nestjs/common';
import { MenuItemCreateDto } from './dtos/create.dto';
import { UpdateMenuItemDto } from './dtos/update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MenuItem, MenuItemDocument } from './entities/menu-item.schema';
import { Model } from 'mongoose';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
  ) {}
  async create(createMenuItemDto: MenuItemCreateDto): Promise<MenuItem> {
    const newMenuItem = new this.menuItemModel(createMenuItemDto);
    return newMenuItem.save();
  }

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} menuItem`;
  }

  update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    return `This action updates a #${id} menuItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuItem`;
  }
}
