import { Schema, Model } from 'mongoose';
import { useDB, getCollectionName } from '@/utils/db';

export interface DailyStatement {
  playerId: string;
  gameId: number;
  time: Date;
  stake: number;
  win: number;
  USD: {
    stake: number;
    win: number;
  };
}

const dailyStatementSchema = new Schema<DailyStatement>(
  {
    playerId: { type: String, required: true },
    gameId: { type: Number, required: true },
    time: { type: Date, required: true },
    stake: { type: Number, required: true },
    win: { type: Number, required: true },
    USD: {
      stake: Number,
      win: Number,
    },
  },
  { collection: getCollectionName('daily_statements') }
);

export function getDailyStatementModel() {
  const db = useDB('summary');
  return (
    db.models.DailyStatement ||
    db.model<DailyStatement>('DailyStatement', dailyStatementSchema)
  );
}
