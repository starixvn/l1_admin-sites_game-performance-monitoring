import { connectDB } from '@/utils/db';
import { DailySummary } from '@/models/DailySummary';
import { getGameConfigModel } from '@/models/GameConfig';

export async function getData() {
  try {
    await connectDB();
    const summaries = await DailySummary.find()
      .sort({ time: -1 })
      .limit(100)
      .lean()
      .exec();

    const gameIds = [...new Set(summaries.map((s) => s.gameId))];
    const gameNames = await getGameNames(gameIds);

    const enrichedSummaries = summaries.map((summary) => ({
      ...summary,
      gameName: gameNames[summary.gameId] || `Game ${summary.gameId}`,
    }));

    return JSON.parse(JSON.stringify(enrichedSummaries));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function getTopGames() {
  try {
    await connectDB();
    const [topProfits, topLosses] = await Promise.all([
      DailySummary.find()
        .sort({ winloss: -1 })
        .limit(5)
        .select('gameId winloss currency')
        .lean()
        .exec(),
      DailySummary.find()
        .sort({ winloss: 1 })
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

    const gameNames = await getGameNames(gameIds);

    const profits = topProfits.map((game) => ({
      ...game,
      gameName: gameNames[game.gameId] || `Game ${game.gameId}`,
    }));

    const losses = topLosses.map((game) => ({
      ...game,
      gameName: gameNames[game.gameId] || `Game ${game.gameId}`,
    }));

    return {
      profits: JSON.parse(JSON.stringify(profits)),
      losses: JSON.parse(JSON.stringify(losses)),
    };
  } catch (error) {
    console.error('Error fetching top games:', error);
    return { profits: [], losses: [] };
  }
}

async function getGameNames(gameIds: string[]) {
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
