import { connectDB } from '@/utils/db';
import { getBetModel } from '../models/Bet';
import { GAME_COLLECTION_MAP } from '../constants/gameCollectionMapper';

interface BetDetails {
  even?: number;
  odd?: number;
  red2?: number;
  red3?: number;
  red4?: number;
  white3?: number;
  white4?: number;
  [key: string]: any;
}

export async function getBetDetails(
  gameId: number,
  roundId: number,
  playerId: string
) {
  try {
    await connectDB();
    const collectionName = GAME_COLLECTION_MAP[gameId];

    if (!collectionName) {
      console.error(`No collection mapped for gameId: ${gameId}`);
      return null;
    }

    const BetModel = getBetModel(collectionName);

    const bet = (await BetModel.findOne({
      roundId,
      playerId,
    })
      .lean()
      .exec()) as BetDetails;

    if (!bet) return null;

    return {
      even: bet.even || 0,
      odd: bet.odd || 0,
      red2: bet.red2 || 0,
      red3: bet.red3 || 0,
      red4: bet.red4 || 0,
      white3: bet.white3 || 0,
      white4: bet.white4 || 0,
    };
  } catch (error) {
    console.error('Error fetching bet details:', error);
    return null;
  }
}
