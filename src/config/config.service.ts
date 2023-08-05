import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'node:path';
import { ConfigModuleOptionsType, EnvVarsType } from './config.type';
import { ConfigDto } from './config.dto';
import { CONFIG_OPTIONS } from './config.token';

@Injectable()
export class ConfigService {
  public readonly config: ConfigDto;

  constructor(
    @Inject(CONFIG_OPTIONS) private options: ConfigModuleOptionsType,
  ) {
    const envFile = path.resolve(__dirname, '../../', this.options.envFilePath);
    const envs = dotenv.config({
      path: envFile,
    }).parsed as EnvVarsType;

    this.config = new ConfigDto(envs);
  }
}
