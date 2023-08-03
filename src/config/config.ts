export default () => ({
  port: Number.parseInt(process.env.PORT) || 5003,
  database: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    uri: process.env.MONGO_URI,
    db: process.env.MONGO_DB,
    params: process.env.MONGO_URI_PARAMS,
    protocol: process.env.MONGO_PROTOCOL,
  },
  mongoUri: ['dev', 'test'].includes(process.env.NODE_ENV)
    ? `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_URI}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    : `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  prices: {
    precision: process.env.TF_PRICE_PRECISION || 2,
  },
});
