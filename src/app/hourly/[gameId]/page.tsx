import { Suspense } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import {
  getGameStatistics,
  getTopPlayers,
} from '@/features/statistics/services/gameStatistics';
import StatisticsBlocks from '@/features/statistics/components/StatisticsBlocks';
import TopPlayersCard from '@/features/summary/summary-top-players/TopPlayersCard';
import Loading from '@/components/UI/Loading';
import TimeSelector from '@/features/summary/components/TimeSelector';

interface PageProps {
  params: { gameId: string };
  searchParams: { time?: string };
}

export default async function GameStatistics({
  params,
  searchParams,
}: PageProps) {
  const now = new Date();
  const currentDate = searchParams.time
    ? new Date(searchParams.time)
    : new Date(now.setMinutes(0, 0, 0));

  const [statistics, topPlayers] = await Promise.all([
    getGameStatistics(parseInt(params.gameId), currentDate),
    getTopPlayers(parseInt(params.gameId), currentDate),
  ]);

  return (
    <PageLayout title={`Game ${params.gameId} Statistics`}>
      <div className="mb-6">
        <TimeSelector defaultDate={currentDate} />
      </div>

      <Suspense fallback={<Loading />}>
        <div className="space-y-6">
          <StatisticsBlocks statistics={statistics} />

          <TopPlayersCard
            players={topPlayers}
            date={currentDate.toISOString()}
          />
        </div>
      </Suspense>
    </PageLayout>
  );
}
