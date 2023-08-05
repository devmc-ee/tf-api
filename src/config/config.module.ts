import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './config.token';
import { ConfigModuleOptionsType } from './config.type';

@Global()
@Module({})
export class ConfigModule {
  static register(options: ConfigModuleOptionsType): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
