import { Schema, model, models, Model } from 'mongoose';

// TypeScript interfaces
export interface CurrencyValues {
  loss: number;
  payout: number;
  refund: number;
  stake: number;
  win: number;
  winloss: number;
}

export interface DailySummary {
  currency: string;
  gameId: number;
  loss: number;
  operatorId: string;
  payout: number;
  playerIds: string[];
  players: number;
  refund: number;
  siteId: string;
  stake: number;
  tickets: number;
  time: Date;
  USD: CurrencyValues;
  VND: CurrencyValues;
  win: number;
  winloss: number;
}

// MongoDB Schema
const dailySummarySchema = new Schema<DailySummary>(
  {
    currency: { type: String, required: true },
    gameId: { type: Number, required: true },
    loss: { type: Number, required: true },
    operatorId: { type: String, required: true },
    payout: { type: Number, required: true },
    playerIds: [{ type: String }],
    players: { type: Number, required: true },
    refund: { type: Number, required: true },
    siteId: { type: String },
    stake: { type: Number, required: true },
    tickets: { type: Number, required: true },
    time: { type: Date, required: true },
    USD: {
      loss: Number,
      payout: Number,
      refund: Number,
      stake: Number,
      win: Number,
      winloss: Number,
    },
    VND: {
      loss: Number,
      payout: Number,
      refund: Number,
      stake: Number,
      win: Number,
      winloss: Number,
    },
    win: { type: Number, required: true },
    winloss: { type: Number, required: true },
  },
  { collection: 'daily_summaries' }
);

// Force the model to use 'summary' database
export const DailySummary =
  models.DailySummary ||
  model('DailySummary', dailySummarySchema, 'daily_summaries');
