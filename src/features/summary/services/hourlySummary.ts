import { getHourlySummaryModel } from '../models/HourlySummary';
import { SummaryService } from './BaseSummaryService';

class HourlySummaryService extends SummaryService {
  protected getModel() {
    return getHourlySummaryModel();
  }
}

const hourlySummaryService = new HourlySummaryService();
export const getData = () => hourlySummaryService.getData();
export const getTopGames = () => hourlySummaryService.getTopGames();
