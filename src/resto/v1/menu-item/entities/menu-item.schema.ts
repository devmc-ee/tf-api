import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MenuItemDocument = HydratedDocument<MenuItem>;

@Schema()
export class MenuItem {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  hidden: boolean;
  @Prop({ required: true })
  soldOut: boolean;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true, unique: true, index: true })
  code: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuGroup',
  })
  groupId: string;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
