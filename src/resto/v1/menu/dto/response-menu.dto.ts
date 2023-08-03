import { ObjectId } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
import { IMenuResponse } from '../menu.type';
import { IMenuItemResponse } from '../../menu-item/menu-item.type';

export class ResponseMenuDto implements IMenuResponse {
  @Exclude() // exposed
  id: string;
  name: string;
  description: string;

  @Exclude()
  _id: ObjectId;
  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;
  items: IMenuItemResponse[];

  @Expose({ name: 'id' })
  toId() {
    return this._id.toString();
  }

  constructor(group: Partial<ResponseMenuDto>) {
    Object.assign(this, group);
  }
}
