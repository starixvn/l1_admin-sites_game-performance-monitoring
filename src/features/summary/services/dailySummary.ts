import { getDailyStatementModel } from '../models/DailyStatement';
import { SummaryService } from './BaseSummaryService';

class DailySummaryService extends SummaryService {
  protected getModel() {
    return getDailyStatementModel();
  }

  async getData(date?: string) {
    const queryDate = date ? new Date(date) : new Date();
    const query = { time: queryDate };
    return super.getData(query);
  }

  async getTopGames(date?: string) {
    const queryDate = date ? new Date(date) : new Date();
    const query = { time: queryDate };
    return super.getTopGames(query);
  }

  async getTopPlayers(date?: string) {
    const queryDate = date ? new Date(date) : new Date();
    const query = { time: queryDate };
    return super.getTopPlayers(query);
  }
}

const dailySummaryService = new DailySummaryService();
export const getData = (date?: string) => dailySummaryService.getData(date);
export const getTopGames = (date?: string) =>
  dailySummaryService.getTopGames(date);
export const getTopPlayers = (date?: string) =>
  dailySummaryService.getTopPlayers(date);
