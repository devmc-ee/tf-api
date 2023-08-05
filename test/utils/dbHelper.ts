import mongoose from 'mongoose';
import envGuard from './envGuard';
import { MODEL_NAME } from 'src/model.type';

envGuard();

export const connectDbAndClear = async (...modelClearList: MODEL_NAME[]) => {
  const mongoUri = process.env.MONGO_FULL_URI;

  console.log(`Connect to: ${mongoUri}`);

  const conn = await mongoose.connect(mongoUri);

  console.log('Connected to db!');

  await clearDb(conn, ...modelClearList);

  return mongoose;
};

export async function clearDb(
  conn: typeof mongoose,
  ...modelClearList: MODEL_NAME[]
) {
  for (const modelName of modelClearList) {
    const collections = await conn.connection.db.listCollections().toArray();

    if (collections.find(({ name }) => name === modelName)) {
      console.log(`\n Delete documents in the "${modelName}" colection \n`);
      await conn.connection.db.collection(modelName).deleteMany();
    }
  }
}

interface ITestData<T> {
  [modelName: string]: T[];
}

export async function insertData<T>(data: ITestData<T>, conn: typeof mongoose) {
  const models = Object.keys(data);

  if (!models.length) {
    return;
  }

  let newData;

  for (const modelName in data) {
    if (data[modelName].length) {
      newData = await conn.connection.db
        .collection(modelName)
        .insertMany(data[modelName]);
    }
  }

  return newData;
}

export const closeConn = async (conn: typeof mongoose) => {
  await conn.connection.close();
  await conn.disconnect();
  console.log('connection closed');
};
