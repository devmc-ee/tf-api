import { ObjectId } from 'mongoose';
import { IMenuGroupResponse } from '../menu-group.type';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseMenuGroupDto implements IMenuGroupResponse {
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

  @Expose({ name: 'id' })
  toId() {
    return this._id.toString();
  }

  constructor(group: Partial<ResponseMenuGroupDto>) {
    Object.assign(this, group);
  }
}
