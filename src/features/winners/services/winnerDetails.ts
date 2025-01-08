import { connectDB } from '@/utils/db';
import { DailyStatement } from '@/features/summary/models/DailyStatement';
import { getPlayerTicketModel } from '../models/PlayerTicket';

export async function getWinnerDetails(playerId: string, date: string) {
  try {
    await connectDB();
    const PlayerTicket = getPlayerTicketModel();

    const [details, tickets] = await Promise.all([
      DailyStatement.aggregate([
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
      ]).exec(),

      PlayerTicket.aggregate([
        {
          $match: {
            playerId,
            time: {
              $gte: new Date(date),
              $lt: new Date(
                new Date(date).setDate(new Date(date).getDate() + 1)
              ),
            },
          },
        },
        {
          $sort: { time: -1 },
        },
        {
          $group: {
            _id: '$roundId',
            roundId: { $first: '$roundId' },
            gameId: { $first: '$gameId' },
            stake: { $first: '$USD.stake' },
            payout: { $first: '$USD.payout' },
            refund: { $first: '$USD.refund' },
            winloss: { $first: '$USD.winloss' },
            time: { $first: '$time' },
          },
        },
        { $sort: { time: -1 } },
      ]).exec(),
    ]);

    return (
      {
        ...details[0],
        tickets: tickets || [],
      } || null
    );
  } catch (error) {
    console.error('Error fetching winner details:', error);
    return null;
  }
}
