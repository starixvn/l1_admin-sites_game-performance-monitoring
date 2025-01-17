import { Schema } from 'mongoose';
import { useDB, getCollectionName } from '@/utils/db';

export interface GameStatistics {
  gameId: number;
  time: Date;
  stake: number;
  payout: number;
  winloss: number;
  tickets: number;
  averageStake: number;
}

const gameStatisticsSchema = new Schema<GameStatistics>(
  {
    gameId: { type: Number, required: true },
    time: { type: Date, required: true },
    stake: { type: Number, required: true },
    payout: { type: Number, required: true },
    winloss: { type: Number, required: true },
    tickets: { type: Number, required: true },
    averageStake: { type: Number, required: true },
  },
  { collection: getCollectionName('game_statistics') }
);

export function getGameStatisticsModel() {
  const db = useDB('summary');
  return (
    db.models.GameStatistics ||
    db.model<GameStatistics>('GameStatistics', gameStatisticsSchema)
  );
}
