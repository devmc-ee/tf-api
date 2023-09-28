import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MenuItem } from './entities/menu-item.schema';
import { Model } from 'mongoose';
import { ResponseMenuItemDto } from './dtos/response-menu-item.dto';
import { IMenuItemResponse } from './menu-item.type';
import { ConfigService } from 'src/config/config.service';
import { ERROR_CODE } from 'src/app.type';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
    private configService: ConfigService,
  ) {}
  async create(
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<IMenuItemResponse> {
    createMenuItemDto.price = Number.parseFloat(
      createMenuItemDto.price,
    ).toFixed(this.configService.config.prices.precision);

    const newMenuItem = new this.menuItemModel(createMenuItemDto);
    const menuItemDoc = await newMenuItem.save();

    return new ResponseMenuItemDto(menuItemDoc.toObject());
  }

  async findAll(): Promise<ResponseMenuItemDto[]> {
    const menuItems = await this.menuItemModel.find().exec();
    return menuItems.map(
      (menuItemDoc) => new ResponseMenuItemDto(menuItemDoc.toObject()),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} menuItem`;
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    const menuItem = await this.menuItemModel
      .findOneAndUpdate({ _id: id }, updateMenuItemDto)
      .exec();
    return new ResponseMenuItemDto(menuItem.toObject());
  }

  async remove(id: string) {
    const menuItem = await this.menuItemModel.deleteOne({ _id: id }).exec();

    if (!menuItem.deletedCount) {
      throw new HttpException(
        `Menu group not found, ${ERROR_CODE.MENU_ITEM_NOT_FOUND}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
