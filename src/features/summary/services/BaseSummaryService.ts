import { connectDB } from '@/utils/db';
import { getGameConfigModel } from '@/features/gameConfig/models/GameConfig';
import { BaseSummaryService, GameSummary, TopGamesResult } from './types';

export abstract class SummaryService implements BaseSummaryService {
  protected abstract getModel(): any;

  async getData(): Promise<GameSummary[]> {
    try {
      await connectDB();
      const summaries = await this.getModel()
        .find()
        .sort({ time: -1 })
        .limit(100)
        .lean()
        .exec();

      const gameIds = [...new Set(summaries.map((s) => s.gameId))];
      const gameNames = await this.getGameNames(gameIds);

      const enrichedSummaries = summaries.map((summary) => ({
        ...summary,
        winloss: -1 * summary.winloss,
        gameName: gameNames[summary.gameId] || `Game ${summary.gameId}`,
      }));

      return JSON.parse(JSON.stringify(enrichedSummaries));
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getTopGames(): Promise<TopGamesResult> {
    try {
      await connectDB();
      const [topProfits, topLosses] = await Promise.all([
        this.getModel()
          .find()
          .sort({ winloss: 1 })
          .limit(5)
          .select('gameId winloss currency')
          .lean()
          .exec(),
        this.getModel()
          .find()
          .sort({ winloss: -1 })
          .limit(5)
          .select('gameId winloss currency')
          .lean()
          .exec(),
      ]);

      const gameIds = [
        ...new Set([
          ...topProfits.map((g) => g.gameId),
          ...topLosses.map((g) => g.gameId),
        ]),
      ];
      const gameNames = await this.getGameNames(gameIds);

      const profits = this.enrichSummaries(topProfits, gameNames);
      const losses = this.enrichSummaries(topLosses, gameNames);

      return {
        profits: JSON.parse(JSON.stringify(profits)),
        losses: JSON.parse(JSON.stringify(losses)),
      };
    } catch (error) {
      console.error('Error fetching top games:', error);
      return { profits: [], losses: [] };
    }
  }

  protected async getGameNames(
    gameIds: string[]
  ): Promise<Record<string, string>> {
    try {
      await connectDB();
      const GameConfig = getGameConfigModel();
      const games = await GameConfig.find({
        gameId: { $in: gameIds },
      })
        .select('gameId displayName name')
        .lean()
        .exec();

      return games.reduce(
        (acc, game) => {
          acc[game.gameId] = game.displayName || game.name;
          return acc;
        },
        {} as Record<string, string>
      );
    } catch (error) {
      console.error('Error fetching game names:', error);
      return {};
    }
  }

  private enrichSummaries(
    summaries: GameSummary[],
    gameNames: Record<string, string>
  ): GameSummary[] {
    return summaries.map((game) => ({
      ...game,
      winloss: -1 * game.winloss,
      gameName: gameNames[game.gameId] || `Game ${game.gameId}`,
    }));
  }
}
