import { Schema, Model, models } from 'mongoose';
import { useDB } from '@/utils/db';

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
    collection: 'game_configs',
  }
);

export function getGameConfigModel() {
  const db = useDB('minigame');
  // Check if model already exists to prevent recompilation
  return (
    db.models.GameConfig || db.model<GameConfig>('GameConfig', gameConfigSchema)
  );
}
