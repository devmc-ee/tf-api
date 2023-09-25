import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem } from '../menu-item/entities/menu-item.schema';
import { MenuGroup } from '../menu-group/entities/menu-group.schema';
import { ResponseMenuItemDto } from '../menu-item/dtos/response-menu-item.dto';
import { ResponseMenuDto } from './dto/response-menu.dto';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuItem.name) private readonly menuItemModel: Model<MenuItem>,
    @InjectModel(MenuGroup.name)
    private readonly menuGroupModel: Model<MenuGroup>,
    private configService: ConfigService,
  ) {}

  async findAll(emptyGroups = false) {
    const menuGroups = await this.menuGroupModel.find().exec();
    const menuItems = await this.menuItemModel.find().exec();

    const menuList = menuGroups.map((group) => {
      const filteredItems = menuItems
        .filter(({ groupId, hidden }) => {
          return groupId.toString() === group._id.toString() && !hidden;
        })
        .map((item) => {
          const menuItem = item.toObject();

          menuItem.price = Number.parseFloat(menuItem.price).toFixed(
            this.configService.config.prices.precision,
          );

          return new ResponseMenuItemDto(menuItem);
        });

      return new ResponseMenuDto({
        ...group.toObject(),
        items: filteredItems,
      });
    });

    return !emptyGroups
      ? menuList.filter(({ items }) => items.length > 0)
      : menuList;
  }
}
