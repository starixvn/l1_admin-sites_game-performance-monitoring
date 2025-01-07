import { DailyStatement } from '../models/DailyStatement';
import { SummaryService } from './BaseSummaryService';

class DailySummaryService extends SummaryService {
  protected getModel() {
    return DailyStatement;
  }

  async getData() {
    const today = new Date().toISOString().split('T')[0];
    const query = {
      time: new Date(today),
    };
    return super.getData(query);
  }

  async getTopGames() {
    const today = new Date().toISOString().split('T')[0];
    const query = {
      time: new Date(today),
    };
    return super.getTopGames(query);
  }

  async getTopPlayers() {
    const today = new Date().toISOString().split('T')[0];
    const query = {
      time: new Date(today),
    };
    return super.getTopPlayers(query);
  }
}

const dailySummaryService = new DailySummaryService();
export const getData = () => dailySummaryService.getData();
export const getTopGames = () => dailySummaryService.getTopGames();
export const getTopPlayers = () => dailySummaryService.getTopPlayers();
