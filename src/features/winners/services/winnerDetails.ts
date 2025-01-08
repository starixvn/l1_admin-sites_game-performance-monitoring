import { connectDB } from '@/utils/db';
import { DailyStatement } from '@/features/summary/models/DailyStatement';

export async function getWinnerDetails(playerId: string, date: string) {
  try {
    await connectDB();

    const details = await DailyStatement.aggregate([
      {
        $match: {
          playerId,
          time: new Date(date),
        },
      },
      {
        $group: {
          _id: '$playerId',
          operatorId: { $first: '$operatorId' },
          currency: { $first: '$currency' },
          siteId: { $first: '$siteId' },
          totalTickets: { $sum: '$tickets' },
          totalStake: { $sum: '$USD.stake' },
          totalPayout: { $sum: '$USD.payout' },
          totalWinloss: { $sum: '$USD.winloss' },
          roundIds: { $push: '$roundIds' },
        },
      },
    ]).exec();

    return details[0] || null;
  } catch (error) {
    console.error('Error fetching winner details:', error);
    return null;
  }
}
