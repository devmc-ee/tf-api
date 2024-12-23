import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MenuItem,
  MenuItemSchema,
} from '../menu-item/entities/menu-item.schema';
import {
  MenuGroup,
  MenuGroupSchema,
} from '../menu-group/entities/menu-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
    MongooseModule.forFeature([
      { name: MenuGroup.name, schema: MenuGroupSchema },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
