import mongoose from 'mongoose';

const dbPostfix = process.env.DB_POSTFIX || '';
const collectionPostfix = process.env.COLLECTION_POSTFIX || '';

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

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
