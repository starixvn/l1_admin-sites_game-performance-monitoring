import { connectDB } from '@/utils/db';
import { getRoundModel } from '../models/Round';
import { getCollectionName } from '../constants/gameCollectionMapper';

export async function getRoundDetails(gameId: number, roundId: number) {
  try {
    await connectDB();
    const collectionName = getCollectionName(gameId);

    if (!collectionName) {
      console.error(`No collection mapped for gameId: ${gameId}`);
      return null;
    }

    const RoundModel = getRoundModel(collectionName);
    const roundDetails = await RoundModel.findOne({ id: roundId })
      .lean()
      .exec();

    return roundDetails;
  } catch (error) {
    console.error('Error fetching round details:', error);
    return null;
  }
}
