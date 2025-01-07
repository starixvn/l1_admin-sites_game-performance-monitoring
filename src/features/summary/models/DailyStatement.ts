import { Schema, model, models } from 'mongoose';

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
  { collection: 'daily_statements' }
);

export const DailyStatement =
  models.DailyStatement ||
  model('DailyStatement', dailyStatementSchema, 'daily_statements');
