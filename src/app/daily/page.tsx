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

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <PageLayout
      title={`Game Performance Monitor - Daily Summary (${currentDate})`}
    >
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
        <TopPlayersCard players={topPlayers} date={currentDate} />
      </div>

      <div className="mt-6">
        <SummaryTable initialData={data} />
      </div>
    </PageLayout>
  );
}
