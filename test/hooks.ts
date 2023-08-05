import { config, populate } from 'dotenv';
import { ConfigDto } from '../src/config/config.dto';
import envGuard from './utils/envGuard';
import { EnvVarsType } from '../src/config/config.type';

const env = config({ path: '.env.test' }).parsed as EnvVarsType;
const envDto = new ConfigDto(env);
populate(process.env, { MONGO_FULL_URI: envDto.mongoUri });

envGuard();
