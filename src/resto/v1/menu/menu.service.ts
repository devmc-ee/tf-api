import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem } from '../menu-item/entities/menu-item.schema';
import { MenuGroup } from '../menu-group/entities/menu-group.schema';
import { MenuItemResponseDto } from '../menu-item/dtos/response.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuItem.name) private readonly menuItemModel: Model<MenuItem>,
    @InjectModel(MenuGroup.name)
    private readonly menuGroupModel: Model<MenuGroup>,
  ) {}
  async findAll() {
    const menuGroups = await this.menuGroupModel.find().exec();
    const menuItems = await this.menuItemModel.find().exec();

    return menuGroups
      .map((group) => {
        const filteredItems = menuItems
          .filter(({ groupId, hidden }) => {
            return groupId.toString() === group._id.toString() && !hidden;
          })
          .map((item) => new MenuItemResponseDto(item.toObject()));

        return { ...group.toObject(), items: filteredItems };
      })
      .filter(({ items }) => items.length > 0);
  }
}
