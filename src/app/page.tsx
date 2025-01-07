import { Suspense } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import {
  getData,
  getTopGames,
} from '@/features/summary/services/summary/dailySummary';
import { getHourlyData } from '@/features/summary/services/summary/hourlySummary';
import { getGameConfig } from '@/features/gameConfig/services/gameConfig';
import SummaryTable from '@/components/SummaryTable/Table';
import TopGamesCard from '@/components/TopGames/TopGamesCard';
import Loading from '@/components/UI/Loading';
import Error from '@/components/UI/Error';

export default async function DailySummary() {
  const [data, topGames] = await Promise.all([getData(), getTopGames()]);

  return (
    <PageLayout title="Game Performance Monitor - Daily Summary">
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
    </PageLayout>
  );
}
