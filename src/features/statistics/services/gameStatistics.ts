import {
  getHourlySummaryModel,
  HourlySummary,
} from '@/features/summary/models/HourlySummary';
import { connectDB } from '@/utils/db';

export interface GameStatistics {
  gameId: number;
  time: Date;
  stake: number;
  payout: number;
  winloss: number;
  tickets: number;
  averageStake: number;
}

class GameStatisticsService {
  protected getModel() {
    return getHourlySummaryModel();
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
      };
    }

    return {
      gameId: result.gameId,
      time: result.time,
      stake: result.USD?.stake || 0,
      payout: result.USD?.payout || 0,
      winloss: result.USD?.winloss || 0,
      tickets: result.tickets,
      averageStake: result.tickets > 0 ? result.USD?.stake / result.tickets : 0,
    };
  }
}

const gameStatisticsService = new GameStatisticsService();
export const getGameStatistics = (gameId: number, date: Date) =>
  gameStatisticsService.getStatistics(gameId, date);
