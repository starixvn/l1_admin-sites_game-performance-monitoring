import { DailySummary } from '../models/DailySummary';
import { SummaryService } from './BaseSummaryService';

class DailySummaryService extends SummaryService {
  protected getModel() {
    return DailySummary;
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
}

const dailySummaryService = new DailySummaryService();
export const getData = () => dailySummaryService.getData();
export const getTopGames = () => dailySummaryService.getTopGames();
