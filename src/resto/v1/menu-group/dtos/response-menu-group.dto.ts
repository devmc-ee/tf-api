import { ObjectId } from 'mongoose';
import { IMenuGroupResponse } from '../menu-group.type';
import { Exclude, Expose } from 'class-transformer';

export class ResponseMenuGroupDto implements IMenuGroupResponse {
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

  @Expose({ name: 'id' })
  toId() {
    return this._id.toString();
  }

  constructor(group: Partial<ResponseMenuGroupDto>) {
    Object.assign(this, group);
  }
}
