import { Exclude, Expose } from 'class-transformer';
import { MenuItemDocument } from '../entities/menu-item.schema';
import { IMenuItemResponse } from '../menu-item.type';
import { ObjectId } from 'mongoose';

export class MenuItemResponseDto implements IMenuItemResponse {
  @Exclude() // exposed
  id: string;
  @Exclude()
  _id: ObjectId;
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: string;
  code: string;
  groupId: string;
  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;

  @Expose({ name: 'id' })
  toId() {
    return this._id.toString();
  }
  constructor(menuItem: Partial<MenuItemDocument>) {
    Object.assign(this, menuItem);

    this.groupId = menuItem.groupId.toString();
  }
}
