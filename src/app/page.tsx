import { Suspense } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import {
  getData,
  getTopGames,
  getTopPlayers,
} from '@/features/summary/services/dailySummary';
import SummaryTable from '@/features/summary/summary-list/Table';
import TopGamesCard from '@/features/summary/summary-top-game/TopGamesCard';
import Loading from '@/components/UI/Loading';
import Error from '@/components/UI/Error';
import TopPlayersCard from '@/features/summary/summary-top-players/TopPlayersCard';

export default async function DailySummary() {
  const [data, topGames, topPlayers] = await Promise.all([
    getData(),
    getTopGames(),
    getTopPlayers(),
  ]);

  // Calculate totals for current date
  const totals = data.reduce(
    (acc, game) => ({
      stake: acc.stake + game.stake,
      payout: acc.payout + game.payout,
      winloss: acc.winloss + game.winloss,
    }),
    { stake: 0, payout: 0, winloss: 0 }
  );

  // Format current date
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <PageLayout title="Game Performance Monitor - Daily Summary">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Summary for {currentDate}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Total Stake</div>
            <div className="text-xl font-bold">
              {totals.stake.toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Total Payout</div>
            <div className="text-xl font-bold">
              {totals.payout.toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Total Win/Loss</div>
            <div
              className={`text-xl font-bold ${totals.winloss >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {totals.winloss.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

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
        <TopPlayersCard players={topPlayers} date={currentDate} />
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
    </PageLayout>
  );
}
