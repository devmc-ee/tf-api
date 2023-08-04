import { ObjectId } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
import { IMenuResponse } from '../menu.type';
import { IMenuItemResponse } from '../../menu-item/menu-item.type';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseMenuItemDto } from '../../menu-item/dtos/response-menu-item.dto';

export class ResponseMenuDto implements IMenuResponse {
  @ApiProperty()
  @Exclude() // exposed
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;

  @Exclude()
  _id: ObjectId;
  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;

  @ApiProperty({ type: [ResponseMenuItemDto] })
  items: IMenuItemResponse[];

  @Expose({ name: 'id' })
  toId() {
    return this._id.toString();
  }

  constructor(group: Partial<ResponseMenuDto>) {
    Object.assign(this, group);
  }
}
