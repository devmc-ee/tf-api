export interface IDatabaseConf {
  user: string;
  password: string;
  uri: string;
  db: string;
  params: string;
  protocol: string;
}

export interface IPrices {
  precision: number;
}

export enum NODE_ENV {
  dev = 'dev',
  prod = 'prod',
  test = 'test',
}

export interface IEnvConfig {
  env: NODE_ENV;
  port: number;
  database: IDatabaseConf;
  mongoUri: string;
  prices: IPrices;
  host: string;
}

export type BaseEnvVarNameType =
  | 'PORT'
  | 'MONGO_PORT'
  | 'MONGO_DB'
  | 'MONGO_USER'
  | 'MONGO_PASSWORD'
  | 'MONGO_PROTOCOL'
  | 'MONGO_URI'
  | 'MONGO_URI_PARAMS'
  | 'HOST'
  | 'TF_PRICE_PRECISION';

export type NodeEvnVarType = Record<'NODE_ENV', NODE_ENV>;

export type EnvVarsType = Record<BaseEnvVarNameType, string> & NodeEvnVarType;

export type ConfigModuleOptionNameType = 'envFilePath';
export type ConfigModuleOptionsType = Record<ConfigModuleOptionNameType, any>;
