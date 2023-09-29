import { ObjectId } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IWeekdayWorkingData, WeekDay } from '../working-time.type';

export class ResponseWorkingTimeDto implements IWeekdayWorkingData {
  @ApiProperty()
  index: number;
  @ApiProperty()
  isOpen: boolean;
  @ApiProperty()
  start: string;
  @ApiProperty()
  end: string;
  @ApiProperty()
  comment = '';
  @ApiProperty()
  weekday: WeekDay;
  @ApiProperty()
  name: string;
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

  constructor(workingTime: Partial<ResponseWorkingTimeDto>) {
    Object.assign(this, workingTime);
  }
}
