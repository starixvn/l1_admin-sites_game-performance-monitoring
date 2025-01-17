import { Schema, Model } from 'mongoose';
import { useDB, getCollectionName } from '@/utils/db';

export interface HourlyStatement {
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

const hourlyStatementSchema = new Schema<HourlyStatement>(
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
  { collection: getCollectionName('hourly_statements') }
);

export function getHourlyStatementModel() {
  const db = useDB('summary');
  return (
    db.models.HourlyStatement ||
    db.model<HourlyStatement>('HourlyStatement', hourlyStatementSchema)
  );
}
