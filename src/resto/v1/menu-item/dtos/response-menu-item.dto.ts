import { Exclude, Expose } from 'class-transformer';
import { MenuItemDocument } from '../entities/menu-item.schema';
import { IMenuItemResponse } from '../menu-item.type';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseMenuItemDto implements IMenuItemResponse {
  @ApiProperty()
  @Exclude() // exposed
  id: string;

  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  soldOut: boolean;
  @ApiProperty({
    description: 'Price with . decimal separator',
  })
  price: string;
  @ApiProperty({
    description: 'Unique menu item code',
  })
  code: string;
  @ApiProperty()
  groupId: string;

  @ApiProperty({
    description: 'Public id',
  })
  image: string;

  @Exclude()
  hidden: boolean;
  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;
  @Exclude()
  _id: ObjectId;

  @Expose({ name: 'id' })
  toId() {
    return this._id.toString();
  }
  constructor(menuItem: Partial<MenuItemDocument>) {
    Object.assign(this, menuItem);

    this.groupId = menuItem.groupId.toString();
  }
}
