import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuGroupDocument = HydratedDocument<MenuGroup>;

@Schema()
export class MenuGroup {
  @Prop({ required: true, unique: true, index: true })
  name: string;
  @Prop()
  description: string;
}

export const MenuGroupSchema = SchemaFactory.createForClass(MenuGroup);
