import {
  getHourlySummaryModel,
  HourlySummary,
} from '@/features/summary/models/HourlySummary';
import { getHourlyStatementModel } from '@/features/statistics/models/HourlyStatement';
import { connectDB } from '@/utils/db';

export interface GameStatistics {
  gameId: number;
  time: Date;
  stake: number;
  payout: number;
  winloss: number;
  tickets: number;
  averageStake: number;
  players: number;
}

class GameStatisticsService {
  protected getModel() {
    return getHourlySummaryModel();
  }

  protected getStatementModel() {
    return getHourlyStatementModel();
  }

  async getStatistics(gameId: number, date: Date): Promise<GameStatistics> {
    await connectDB();
    const model = this.getModel();
    const query = { gameId, time: date };
    const result = await model.findOne<HourlySummary>(query).lean().exec();

    if (!result) {
      return {
        gameId,
        time: date,
        stake: 0,
        payout: 0,
        winloss: 0,
        tickets: 0,
        averageStake: 0,
        players: 0,
      };
    }

    return {
      gameId: result.gameId,
      time: result.time,
      stake: result.USD?.stake || 0,
      payout: result.USD?.payout || 0,
      winloss: -result.USD?.winloss || 0,
      tickets: result.tickets,
      averageStake: result.tickets > 0 ? result.USD?.stake / result.tickets : 0,
      players: result.players || 0,
    };
  }

  async getTopPlayers(gameId: number, date: Date) {
    const model = this.getStatementModel();
    const query = { gameId, time: date };

    // Aggregate to get top players
    const topPlayers = await model.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$playerId',
          playerId: { $first: '$playerId' },
          stake: { $sum: '$USD.stake' },
          payout: { $sum: '$USD.payout' },
        },
      },
      {
        $project: {
          playerId: 1,
          stake: 1,
          payout: 1,
          winloss: { $subtract: ['$stake', '$payout'] }, // Calculate winloss
        },
      },
      { $sort: { winloss: 1 } },
      { $limit: 10 },
    ]);

    return topPlayers.map((player) => ({
      playerId: player.playerId,
      stake: player.stake || 0,
      winloss: player.winloss || 0,
    }));
  }
}

const gameStatisticsService = new GameStatisticsService();
export const getGameStatistics = (gameId: number, date: Date) =>
  gameStatisticsService.getStatistics(gameId, date);
export const getTopPlayers = (gameId: number, date: Date) =>
  gameStatisticsService.getTopPlayers(gameId, date);
