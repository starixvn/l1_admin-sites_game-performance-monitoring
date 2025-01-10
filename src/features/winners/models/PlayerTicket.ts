import { Schema, Model } from 'mongoose';
import { useDB, getCollectionName } from '@/utils/db';

export interface PlayerTicket {
  playerId: string;
  gameId: number;
  roundId: number;
  stake: number;
  payout: number;
  refund: number;
  winloss: number;
  time: Date;
  USD: {
    stake: number;
    payout: number;
    refund: number;
    winloss: number;
  };
}

const playerTicketSchema = new Schema<PlayerTicket>(
  {
    playerId: { type: String, required: true },
    gameId: { type: Number, required: true },
    roundId: { type: Number, required: true },
    stake: { type: Number, required: true },
    payout: { type: Number, required: true },
    refund: { type: Number, required: true },
    winloss: { type: Number, required: true },
    time: { type: Date, required: true },
    USD: {
      stake: Number,
      payout: Number,
      refund: Number,
      winloss: Number,
    },
  },
  { collection: getCollectionName('ticket_silos') }
);

export function getPlayerTicketModel() {
  const db = useDB('minigame');

  return (
    db.models.PlayerTicket ||
    db.model<PlayerTicket>('PlayerTicket', playerTicketSchema)
  );
}
