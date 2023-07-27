import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './resto/v1/menu/menu.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemModule } from './resto/v1/menu-item/menu-item.module';
import { MenuGroupModule } from './resto/v1/menu-group/menu-group.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configuration],
    }),
    MenuModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    MenuItemModule,
    MenuGroupModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
