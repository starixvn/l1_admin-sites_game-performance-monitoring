import { connectDB } from '@/utils/db';
import { getGameConfigModel } from '@/features/gameConfig/models/GameConfig';
import { BaseSummaryService, GameSummary, TopGamesResult } from './types';

export abstract class SummaryService implements BaseSummaryService {
  protected abstract getModel(): any;

  async getData(query = {}) {
    try {
      await connectDB();
      const summaries = await this.getModel()
        .aggregate([
          { $match: query },
          {
            $group: {
              _id: '$gameId',
              time: { $first: '$time' },
              gameId: { $first: '$gameId' },
              stake: { $sum: '$USD.stake' },
              payout: { $sum: '$USD.payout' },
              winloss: { $sum: '$USD.winloss' },
              currency: { $first: 'USD' },
              tickets: { $sum: '$tickets' },
            },
          },
          { $sort: { time: -1 } },
          { $limit: 100 },
        ])
        .exec();

      const gameIds = summaries.map((s) => s.gameId);
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

  async getTopGames(query = {}) {
    try {
      await connectDB();
      const [topProfits, topLosses] = await Promise.all([
        this.getModel()
          .aggregate([
            { $match: { ...query, 'USD.winloss': { $lt: 0 } } },
            {
              $group: {
                _id: '$gameId',
                gameId: { $first: '$gameId' },
                winloss: { $sum: '$USD.winloss' },
                currency: { $first: 'USD' },
                time: { $first: '$time' },
              },
            },
            { $sort: { winloss: 1 } },
            { $limit: 5 },
          ])
          .exec(),
        this.getModel()
          .aggregate([
            { $match: { ...query, 'USD.winloss': { $gt: 0 } } },
            {
              $group: {
                _id: '$gameId',
                gameId: { $first: '$gameId' },
                winloss: { $sum: '$USD.winloss' },
                currency: { $first: 'USD' },
                time: { $first: '$time' },
              },
            },
            { $sort: { winloss: -1 } },
            { $limit: 5 },
          ])
          .exec(),
      ]);

      const gameIds = [
        ...new Set([
          ...topProfits.map((g) => g.gameId),
          ...topLosses.map((g) => g.gameId),
        ]),
      ];

      const gameNames = await this.getGameNames(gameIds);

      const profits = topProfits.map((game) => ({
        ...game,
        winloss: -1 * game.winloss,
        gameName: gameNames[game.gameId] || `Game ${game.gameId}`,
      }));

      const losses = topLosses.map((game) => ({
        ...game,
        winloss: -1 * game.winloss,
        gameName: gameNames[game.gameId] || `Game ${game.gameId}`,
      }));

      return {
        profits: profits.length ? JSON.parse(JSON.stringify(profits)) : [],
        losses: losses.length ? JSON.parse(JSON.stringify(losses)) : [],
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

  async getTopPlayers(query = {}) {
    try {
      await connectDB();
      const topPlayers = await this.getModel()
        .aggregate([
          { $match: { ...query, 'USD.winloss': { $gt: 0 } } },
          {
            $group: {
              _id: '$playerId',
              playerId: { $first: '$playerId' },
              stake: { $sum: '$USD.stake' },
              winloss: { $sum: '$USD.winloss' },
            },
          },
          { $sort: { winloss: -1 } },
          { $limit: 10 },
        ])
        .exec();

      return topPlayers.length ? JSON.parse(JSON.stringify(topPlayers)) : [];
    } catch (error) {
      console.error('Error fetching top players:', error);
      return [];
    }
  }
}
