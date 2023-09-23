import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './resto/v1/menu/menu.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemModule } from './resto/v1/menu-item/menu-item.module';
import { MenuGroupModule } from './resto/v1/menu-group/menu-group.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { WorkingTimeModule } from './resto/v1/working-time/working-time.module';
@Module({
  imports: [
    ConfigModule.register({
      envFilePath: `./.env.${process.env.NODE_ENV || 'dev'}${
        process.env.NODE_ENV === 'dev' ? '.local' : ''
      }`,
    }),
    MenuModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.config.mongoUri,
        autoIndex: true,
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    MenuItemModule,
    MenuGroupModule,
    ConfigModule,
    AuthModule,
    WorkingTimeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
