import { Suspense } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import {
  getData,
  getTopGames,
} from '@/features/summary/services/hourlySummary';
import SummaryTable from '@/features/summary/summary-list/Table';
import TopGamesCard from '@/features/summary/summary-top-game/TopGamesCard';
import Loading from '@/components/UI/Loading';
import Error from '@/components/UI/Error';
import TimeSelector from '@/features/summary/components/TimeSelector';

interface PageProps {
  searchParams: { time?: string };
}

export default async function HourlySummary({ searchParams }: PageProps) {
  const now = new Date();
  // Get time from URL or default to current time
  const currentDate = searchParams.time
    ? new Date(searchParams.time)
    : new Date(now.setMinutes(0, 0, 0));

  const [data, topGames] = await Promise.all([
    getData(currentDate),
    getTopGames(currentDate),
  ]);

  const today = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <PageLayout title={`Game Performance Monitor - Hourly Summary (${today})`}>
      <div className="mb-6">
        <TimeSelector defaultDate={currentDate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TopGamesCard
          title="Profit Games"
          games={topGames.profits}
          isProfit={true}
        />
        <TopGamesCard
          title="Loss Games"
          games={topGames.losses}
          isProfit={false}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <Suspense fallback={<Loading />}>
            {data.length > 0 ? (
              <SummaryTable initialData={data} showHour={true} />
            ) : (
              <Error message="Failed to load data" />
            )}
          </Suspense>
        </div>
      </div>
    </PageLayout>
  );
}
