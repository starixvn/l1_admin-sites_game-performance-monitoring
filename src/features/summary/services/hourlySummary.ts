import { HourlySummary } from '../models/HourlySummary';
import { SummaryService } from './BaseSummaryService';

class HourlySummaryService extends SummaryService {
  protected getModel() {
    return HourlySummary;
  }
}

const hourlySummaryService = new HourlySummaryService();
export const getData = () => hourlySummaryService.getData();
export const getTopGames = () => hourlySummaryService.getTopGames();
