import { connectDB } from '@/utils/db';
import { getDailyStatementModel } from '@/features/summary/models/DailyStatement';
import { getPlayerTicketModel, PlayerTicket } from '../models/PlayerTicket';
import { getRoundDetails } from './roundDetails';
import { Round, SettlementResult } from '../models/Round';

interface TicketWithSettlement extends PlayerTicket {
  settlementResult: SettlementResult | null;
}

export async function getWinnerDetails(playerId: string, date: string) {
  try {
    await connectDB();
    const PlayerTicket = getPlayerTicketModel();

    const [details, tickets] = await Promise.all([
      getDailyStatementModel()
        .aggregate([
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
        ])
        .exec(),

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

    // Fetch round details for each ticket
    const ticketsWithRoundInfo: TicketWithSettlement[] = await Promise.all(
      tickets.map(async (ticket) => {
        const roundDetails = await getRoundDetails(
          ticket.gameId,
          ticket.roundId
        );
        return {
          ...ticket,
          settlementResult: roundDetails?.settlementResult || null,
        };
      })
    );

    return {
      ...details[0],
      tickets: ticketsWithRoundInfo || [],
    };
  } catch (error) {
    console.error('Error fetching winner details:', error);
    return null;
  }
}
