import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './resto/v1/menu/menu.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemModule } from './resto/v1/menu-item/menu-item.module';
import { MenuGroupModule } from './resto/v1/menu-group/menu-group.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      envFilePath: `./.env.${process.env.NODE_ENV || 'dev'}`,
      isGlobal: true,
      load: [configuration],
    }),
    MenuModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
        autoIndex: true,
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    MenuItemModule,
    MenuGroupModule,
    ConfigModule,
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
