import { Schema, model, models } from 'mongoose';

export interface HourlySummary {
  _id: string;
  time: Date;
  gameId: string;
  currency: string;
  stake: number;
  payout: number;
  winloss: number;
  tickets: number;
  operatorId: string;
  siteId: string;
  players: number;
  playerIds: string[];
  win: number;
  loss: number;
  refund: number;
  USD?: {
    stake: number;
    payout: number;
    winloss: number;
    win: number;
    loss: number;
    refund: number;
  };
  VND?: {
    stake: number;
    payout: number;
    winloss: number;
    win: number;
    loss: number;
    refund: number;
  };
}

const hourlySummarySchema = new Schema<HourlySummary>(
  {
    time: { type: Date, required: true },
    gameId: { type: String, required: true },
    currency: { type: String, required: true },
    stake: { type: Number, required: true },
    payout: { type: Number, required: true },
    winloss: { type: Number, required: true },
    tickets: { type: Number, required: true },
    operatorId: { type: String, required: true },
    siteId: { type: String, required: true },
    players: { type: Number, required: true },
    playerIds: [{ type: String }],
    win: { type: Number, required: true },
    loss: { type: Number, required: true },
    refund: { type: Number, required: true },
    USD: {
      stake: Number,
      payout: Number,
      winloss: Number,
      win: Number,
      loss: Number,
      refund: Number,
    },
    VND: {
      stake: Number,
      payout: Number,
      winloss: Number,
      win: Number,
      loss: Number,
      refund: Number,
    },
  },
  {
    collection: 'hourly_summaries',
  }
);

export const HourlySummary =
  models.HourlySummary || model('HourlySummary', hourlySummarySchema);
