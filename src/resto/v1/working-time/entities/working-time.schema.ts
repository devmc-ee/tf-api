import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IWeekdayWorkingData, WeekDay } from '../working-time.type';
import { MODEL_NAME } from 'src/model.type';

export type WorkingTimeDocument = HydratedDocument<WorkingTime>;

@Schema({
  versionKey: false,
  collection: MODEL_NAME.WORKING_TIME,
  timestamps: true,
})
export class WorkingTime implements IWeekdayWorkingData {
  @Prop({ required: true, unique: true })
  index: number;
  @Prop({ required: true })
  isOpen: boolean;
  @Prop({ required: true })
  start: string;
  @Prop({ required: true })
  end: string;
  @Prop({ required: true })
  comment: string;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(WeekDay),
    unique: true,
    index: true,
  })
  weekday: WeekDay;
}

export const WorkingTimeSchema = SchemaFactory.createForClass(WorkingTime);
