import mongoose from 'mongoose';
import config from '../../configs.json';

const dbPostfix = config.DB_POSTFIX || '';
const collectionPostfix = config.COLLECTION_POSTFIX || '';

export function useDB(dbName: string) {
  const fullDbName = `${dbName}${dbPostfix}`;
  return mongoose.connection.useDb(fullDbName, { useCache: true });
}

export function getCollectionName(baseName: string) {
  return `${baseName}${collectionPostfix}`;
}

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    if (!config.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(config.MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
