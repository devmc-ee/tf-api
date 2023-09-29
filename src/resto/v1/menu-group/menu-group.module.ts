import { Module } from '@nestjs/common';
import { MenuGroupService } from './menu-group.service';
import { MenuGroupController } from './menu-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuGroup, MenuGroupSchema } from './entities/menu-group.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: MenuGroup.name, schema: MenuGroupSchema },
    ]),
  ],
  controllers: [MenuGroupController],
  providers: [MenuGroupService],
})
export class MenuGroupModule {}
