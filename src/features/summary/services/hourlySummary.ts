import { getHourlySummaryModel } from '../models/HourlySummary';
import { SummaryService } from './BaseSummaryService';

class HourlySummaryService extends SummaryService {
  protected getModel() {
    return getHourlySummaryModel();
  }

  async getData(date?: Date) {
    const queryDate = date ? new Date(date) : new Date();
    const query = { time: queryDate };
    return super.getData(query);
  }

  async getTopGames(date?: Date) {
    const queryDate = date ? new Date(date) : new Date();
    const query = { time: queryDate };
    return super.getTopGames(query);
  }
}

const hourlySummaryService = new HourlySummaryService();
export const getData = (date?: Date) => hourlySummaryService.getData(date);
export const getTopGames = (date?: Date) =>
  hourlySummaryService.getTopGames(date);
