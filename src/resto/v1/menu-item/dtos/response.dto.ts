import { MenuItemDocument } from '../entities/menu-item.schema';
import { IMenuItem } from '../menu-item.type';

export class MenuItemResponseDto implements IMenuItem {
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: number;
  code: string;
  groupId: string;
  
  constructor(menuItem: MenuItemDocument) {
    Object.assign(this, menuItem);
  }
}