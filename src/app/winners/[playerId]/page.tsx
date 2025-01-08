import { notFound } from 'next/navigation';
import PageLayout from '@/components/Layout/PageLayout';
import { getWinnerDetails } from '@/features/winners/services/winnerDetails';
import WinnerStats from '@/features/winners/winner-stats/WinnerStats';
import WinnerInfo from '@/features/winners/winner-info/WinnerInfo';
import WinnerRounds from '@/features/winners/winner-rounds/WinnerRounds';

interface Props {
  params: { playerId: string };
  searchParams: { date: string };
}

export default async function WinnerDetails({ params, searchParams }: Props) {
  const details = await getWinnerDetails(params.playerId, searchParams.date);

  if (!details) {
    notFound();
  }

  return (
    <PageLayout title={`Player ${params.playerId} Details`}>
      <WinnerStats
        stake={details.totalStake}
        payout={details.totalPayout}
        winloss={details.totalWinloss}
      />

      <div className="mt-6">
        <WinnerInfo
          operatorId={details.operatorId}
          currency={details.currency}
          siteId={details.siteId}
          tickets={details.totalTickets}
        />
      </div>

      <div className="mt-6">
        <WinnerRounds tickets={details.tickets} />
      </div>
    </PageLayout>
  );
}
