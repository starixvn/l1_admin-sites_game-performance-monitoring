import { DailySummary } from '../models/DailySummary';
import { SummaryService } from './BaseSummaryService';

class DailySummaryService extends SummaryService {
  protected getModel() {
    return DailySummary;
  }

  async getData() {
    // Get today's date at the start (00:00:00) and end (23:59:59)
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );

    const query = {
      time: {
        $gte: startOfDay.toISOString(),
        $lte: endOfDay.toISOString(),
      },
    };
    return super.getData(query);
  }

  async getTopGames() {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );

    const query = {
      time: {
        $gte: startOfDay.toISOString(),
        $lte: endOfDay.toISOString(),
      },
    };
    return super.getTopGames(query);
  }
}

const dailySummaryService = new DailySummaryService();
export const getData = () => dailySummaryService.getData();
export const getTopGames = () => dailySummaryService.getTopGames();
