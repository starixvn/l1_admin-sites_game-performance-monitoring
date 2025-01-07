import { DailySummary } from '../models/DailySummary';
import { SummaryService } from './BaseSummaryService';

class DailySummaryService extends SummaryService {
  protected getModel() {
    return DailySummary;
  }
}

const dailySummaryService = new DailySummaryService();
export const getData = () => dailySummaryService.getData();
export const getTopGames = () => dailySummaryService.getTopGames();
