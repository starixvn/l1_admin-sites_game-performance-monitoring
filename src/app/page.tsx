import { Suspense } from 'react';
import { connectDB } from '../utils/db';
import { DailySummary } from '../models/DailySummary';
import SummaryTable from '../components/SummaryTable/Table';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';
import TopGamesCard from '../components/TopGames/TopGamesCard';

async function getData() {
  try {
    await connectDB();
    const summaries = await DailySummary.find()
      .sort({ time: -1 })
      .limit(100)
      .lean()
      .exec();

    // Ensure the data is serializable
    return JSON.parse(JSON.stringify(summaries));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getTopGames() {
  try {
    await connectDB();
    const [topProfits, topLosses] = await Promise.all([
      // Top 5 profits
      DailySummary.find()
        .sort({ winloss: -1 })
        .limit(5)
        .select('gameId winloss currency')
        .lean()
        .exec(),
      // Top 5 losses
      DailySummary.find()
        .sort({ winloss: 1 })
        .limit(5)
        .select('gameId winloss currency')
        .lean()
        .exec(),
    ]);

    return {
      profits: JSON.parse(JSON.stringify(topProfits)),
      losses: JSON.parse(JSON.stringify(topLosses)),
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
