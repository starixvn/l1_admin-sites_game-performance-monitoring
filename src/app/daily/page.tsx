import PageLayout from '@/components/Layout/PageLayout';
import {
  getData,
  getTopGames,
  getTopPlayers,
} from '@/features/summary/services/dailySummary';
import SummaryStats from '@/features/summary/summary-stats/SummaryStats';
import TopGamesCard from '@/features/summary/summary-top-game/TopGamesCard';
import TopPlayersCard from '@/features/summary/summary-top-players/TopPlayersCard';
import SummaryTable from '@/features/summary/summary-list/Table';
import DatePicker from '@/features/summary/components/DatePicker';

interface DailySummaryProps {
  searchParams: { date?: string };
}

export default async function DailySummary({
  searchParams,
}: DailySummaryProps) {
  try {
    const selectedDate =
      searchParams.date || new Date().toISOString().split('T')[0];

    const [data, topGames, topPlayers] = await Promise.all([
      getData(selectedDate),
      getTopGames(selectedDate),
      getTopPlayers(selectedDate),
    ]);

    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Calculate totals for current date
    const totals = data.reduce(
      (acc, game) => ({
        stake: acc.stake + game.stake,
        payout: acc.payout + game.payout,
        winloss: acc.winloss + game.winloss,
      }),
      { stake: 0, payout: 0, winloss: 0 }
    );

    return (
      <PageLayout
        title={`Game Performance Monitor - Daily Summary (${formattedDate})`}
      >
        <div className="mb-6 flex justify-end">
          <DatePicker initialDate={selectedDate} />
        </div>

        <SummaryStats
          totalStake={totals.stake}
          totalPayout={totals.payout}
          totalWinLoss={totals.winloss}
        />

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
          <TopPlayersCard players={topPlayers} date={selectedDate} />
        </div>

        <div className="mt-6">
          <SummaryTable initialData={data} />
        </div>
      </PageLayout>
    );
  } catch (error) {
    console.error('Error in Daily Summary:', error);
    return (
      <PageLayout title="Game Performance Monitor - Daily Summary">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-medium">Error Loading Data</h3>
          <p>
            There was a problem loading the daily summary. Please try again
            later.
          </p>
        </div>
      </PageLayout>
    );
  }
}
