import { connectDB } from '@/utils/db';
import { getDailyStatementModel } from '@/features/summary/models/DailyStatement';
import { getPlayerTicketModel, PlayerTicket } from '../models/PlayerTicket';
import { getRoundDetails } from './roundDetails';
import { getBetDetails } from './betDetails';
import { SettlementResult } from '../models/Round';
import { Bet } from '../models/Bet';

interface TicketWithDetails extends PlayerTicket {
  settlementResult: SettlementResult | null;
  betDetails: Bet | null;
}

interface RoundDetails {
  settlementResult?: SettlementResult;
  [key: string]: any;
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
              totalWinloss: { $sum: { $multiply: ['$USD.winloss', -1] } },
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
            winloss: { $first: { $multiply: ['$USD.winloss', -1] } },
            time: { $first: '$time' },
          },
        },
        { $sort: { time: -1 } },
      ]).exec(),
    ]);

    // Fetch both round and bet details for each ticket
    const ticketsWithDetails: TicketWithDetails[] = await Promise.all(
      tickets.map(async (ticket) => {
        const [roundDetails, betDetails] = await Promise.all([
          getRoundDetails(
            ticket.gameId,
            ticket.roundId
          ) as Promise<RoundDetails>,
          getBetDetails(ticket.gameId, ticket.roundId, playerId),
        ]);

        return {
          ...ticket,
          settlementResult: roundDetails?.settlementResult || null,
          betDetails: betDetails || null,
        };
      })
    );

    return {
      ...details[0],
      tickets: ticketsWithDetails || [],
    };
  } catch (error) {
    console.error('Error fetching winner details:', error);
    return null;
  }
}
