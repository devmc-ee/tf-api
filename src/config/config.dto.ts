import {
  EnvVarsType,
  ICsrfConfig,
  IDatabaseConf,
  IEnvConfig,
  IPrices,
  NODE_ENV,
} from './config.type';

export class ConfigDto implements IEnvConfig {
  prices: IPrices;
  port: number;
  database: IDatabaseConf;
  mongoUri: string;
  env: NODE_ENV;
  host: string;
  googleClientId: string;
  googleSecretId: string;
  csrf: ICsrfConfig;
  cookieSecret: string;
  serviceToken: string;
  authServiceUrl: string;

  constructor(env: EnvVarsType) {
    this.host = env.HOST;
    this.env = env.NODE_ENV;
    this.port = Number.parseInt(env.MONGO_PORT) || 5003;
    this.database = {
      user: env.MONGO_USER,
      password: env.MONGO_PASSWORD,
      uri: env.MONGO_URI,
      db: env.MONGO_DB,
      params: env.MONGO_URI_PARAMS,
      protocol: env.MONGO_PROTOCOL,
    };
    this.mongoUri = ['dev', 'test'].includes(env.NODE_ENV)
      ? `${env.MONGO_PROTOCOL}://${env.MONGO_URI}:${env.MONGO_PORT}/${env.MONGO_DB}?${env.MONGO_URI_PARAMS}`
      : `${env.MONGO_PROTOCOL}://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_URI}/${env.MONGO_DB}?${env.MONGO_URI_PARAMS}`;
    this.prices = {
      precision: Number.parseInt(env.TF_PRICE_PRECISION),
    };
    this.cookieSecret = env.COOKIE_SECRET;
    this.csrf = {
      responseHeader: env.XSRF_HEADER_NAME,
      cookieKey: env.XSRF_TOKEN_NAME,
    };
    this.serviceToken = env.SERVICE_TOKEN;
    this.authServiceUrl = env.AUTH_SERVICE_URL;
  }
}
