import { Schema, Model } from 'mongoose';
import { useDB, getCollectionName } from '@/utils/db';

export interface GameConfig {
  _id: string;
  gameId: number;
  name: string;
  displayName: string;
  enabled: boolean;
}

const gameConfigSchema = new Schema<GameConfig>(
  {
    gameId: { type: Number, required: true },
    name: { type: String, required: true },
    displayName: { type: String },
    enabled: { type: Boolean, required: true },
  },
  {
    collection: getCollectionName('game_configs'),
  }
);

export function getGameConfigModel() {
  const db = useDB('minigame');

  return (
    db.models.GameConfig || db.model<GameConfig>('GameConfig', gameConfigSchema)
  );
}
