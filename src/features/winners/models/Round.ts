import { Schema, Document } from 'mongoose';
import { useDB } from '@/utils/db';

interface SettlementResult {
  red1?: boolean;
  red2?: boolean;
  red3?: boolean;
  red4?: boolean;
  even?: boolean;
  odd?: boolean;
  white3?: boolean;
  white4?: boolean;
}

export interface Round extends Document {
  roundId: string;
  gameId: number;
  settlementResult: SettlementResult;
  startTime: Date;
  endTime: Date;
  status: string;
}

const settlementResultSchema = new Schema(
  {
    red1: Boolean,
    red2: Boolean,
    red3: Boolean,
    red4: Boolean,
    even: Boolean,
    odd: Boolean,
    white3: Boolean,
    white4: Boolean,
  },
  { _id: false }
);

const roundSchema = new Schema<Round>({
  roundId: { type: String, required: true },
  gameId: { type: Number, required: true },
  settlementResult: { type: settlementResultSchema, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, required: true },
});

export function getRoundModel(gameCollection: string) {
  const db = useDB('minigame');
  const collectionPostfix = process.env.COLLECTION_POSTFIX || '';
  const fullCollectionName = `${gameCollection}_phiens${collectionPostfix}`;

  return (
    db.models[fullCollectionName] ||
    db.model<Round>(fullCollectionName, roundSchema, fullCollectionName)
  );
}

export type { SettlementResult };
