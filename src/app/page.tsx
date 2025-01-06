import { Suspense } from 'react';
import { connectDB } from '@/utils/db';
import { DailySummary } from '@/models/DailySummary';
import { getGameConfigModel } from '@/models/GameConfig';
import SummaryTable from '@/components/SummaryTable/Table';
import TopGamesCard from '@/components/TopGames/TopGamesCard';
import Loading from '@/components/UI/Loading';
import Error from '@/components/UI/Error';

async function getData() {
  try {
    await connectDB();
    const summaries = await DailySummary.find()
      .sort({ time: -1 })
      .limit(100)
      .lean()
      .exec();

    // Get unique game IDs
    const gameIds = [...new Set(summaries.map((s) => s.gameId))];
    const gameNames = await getGameNames(gameIds);

    // Add game names to summaries
    const enrichedSummaries = summaries.map((summary) => ({
      ...summary,
      gameName: gameNames[summary.gameId] || `Game ${summary.gameId}`,
    }));

    // Ensure the data is serializable
    return JSON.parse(JSON.stringify(enrichedSummaries));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getGameNames(gameIds: string[]) {
  try {
    // Ensure we're connected first
    await connectDB();

    // Only get the model and query after connection is established
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

async function getTopGames() {
  try {
    // Ensure connection first
    await connectDB();

    // Then get data
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

    // Get game names after we have the data
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

export default async function Home() {
  const [data, topGames] = await Promise.all([getData(), getTopGames()]);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Game Performance Monitor
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <TopGamesCard
            title="Top 5 Profit Games"
            games={topGames.profits}
            isProfit={true}
          />
          <TopGamesCard
            title="Top 5 Loss Games"
            games={topGames.losses}
            isProfit={false}
          />
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <Suspense fallback={<Loading />}>
              {data.length > 0 ? (
                <SummaryTable initialData={data} />
              ) : (
                <Error message="Failed to load data" />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
