import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { IMenuItemModel } from '../menu-item.type';
import { MODEL_NAME } from 'src/config/model.type';

export type MenuItemDocument = HydratedDocument<MenuItem>;

@Schema({
  versionKey: false,
  collection: MODEL_NAME.MENU_ITEM,
  timestamps: true,
})
export class MenuItem implements IMenuItemModel {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  hidden: boolean;
  @Prop({ required: true })
  soldOut: boolean;
  @Prop({ required: true, type: String })
  price: string;
  @Prop({ required: true, unique: true, index: true })
  code: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAME.MENU_GROUP,
  })
  groupId: ObjectId;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
