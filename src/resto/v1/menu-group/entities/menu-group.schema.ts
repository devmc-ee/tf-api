import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { IMenuGroup } from '../menu-group.type';
import { MODEL_NAME } from 'src/model.type';

export type MenuGroupDocument = HydratedDocument<MenuGroup>;

@Schema({
  versionKey: false,
  collection: MODEL_NAME.MENU_GROUP,
  timestamps: true,
})
export class MenuGroup implements IMenuGroup {
  _id: ObjectId;
  @Prop()
  createdAt: string;
  @Prop()
  updatedAt: string;
  @Prop({ required: true, unique: true, index: true, type: String })
  name: string;
  @Prop()
  description: string;
}

export const MenuGroupSchema = SchemaFactory.createForClass(MenuGroup);
