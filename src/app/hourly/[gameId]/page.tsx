import { Suspense } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import { getGameStatistics } from '@/features/statistics/services/gameStatistics';
import StatisticsBlocks from '@/features/statistics/components/StatisticsBlocks';
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

  const statistics = await getGameStatistics(
    parseInt(params.gameId),
    currentDate
  );

  return (
    <PageLayout title={`Game ${params.gameId} Statistics`}>
      <div className="mb-6">
        <TimeSelector defaultDate={currentDate} />
      </div>

      <Suspense fallback={<Loading />}>
        <StatisticsBlocks statistics={statistics} />
      </Suspense>
    </PageLayout>
  );
}
