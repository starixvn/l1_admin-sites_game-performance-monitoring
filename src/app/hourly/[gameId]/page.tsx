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
  searchParams: {
    time?: string;
    gameName?: string;
  };
}

export default async function GameStatistics({
  params,
  searchParams,
}: PageProps) {
  const now = new Date();
  const currentDate = searchParams.time
    ? new Date(searchParams.time)
    : new Date(now.setMinutes(0, 0, 0));

  const gameName = searchParams.gameName
    ? decodeURIComponent(searchParams.gameName)
    : `Game ${params.gameId}`;

  const [statistics, topPlayers] = await Promise.all([
    getGameStatistics(parseInt(params.gameId), currentDate),
    getTopPlayers(parseInt(params.gameId), currentDate),
  ]);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
  });

  return (
    <PageLayout title={`${gameName} - ${formattedDate}`}>
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
