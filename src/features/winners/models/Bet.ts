import { useDB } from '@/utils/db';
import mongoose, { Schema, Document } from 'mongoose';

export interface Bet extends Document {
  roundId: number;
  playerId: string;
  even: number;
  odd: number;
  red2: number;
  red3: number;
  red4: number;
  white3: number;
  white4: number;
}

const betSchema = new Schema<Bet>({
  roundId: { type: Number, required: true },
  playerId: { type: String, required: true },
  even: { type: Number, default: 0 },
  odd: { type: Number, default: 0 },
  red2: { type: Number, default: 0 },
  red3: { type: Number, default: 0 },
  red4: { type: Number, default: 0 },
  white3: { type: Number, default: 0 },
  white4: { type: Number, default: 0 },
});

export function getBetModel(gameCollection: string) {
  const db = useDB('minigame');
  const collectionPostfix = process.env.COLLECTION_POSTFIX || '';
  const fullCollectionName = `${gameCollection}_cuocs${collectionPostfix}`;

  return (
    db.models[fullCollectionName] ||
    db.model<Bet>(fullCollectionName, betSchema, fullCollectionName)
  );
}
