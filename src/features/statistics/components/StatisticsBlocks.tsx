import { formatCurrency, formatWinLoss } from '@/utils/format';
import type { GameStatistics } from '../models/GameStatistics';

interface StatisticsBlocksProps {
  statistics: GameStatistics;
}

interface BlockProps {
  label: string;
  value: string;
  className?: string;
}

const Block = ({ label, value, className = '' }: BlockProps) => (
  <div className={`p-6 bg-white rounded-lg shadow ${className}`}>
    <div className="text-sm font-medium text-gray-500">{label}</div>
    <div className="mt-1 text-3xl font-semibold">{value}</div>
  </div>
);

export default function StatisticsBlocks({
  statistics,
}: StatisticsBlocksProps) {
  const { stake, payout, winloss, tickets, averageStake, players } = statistics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Block label="Total Stake" value={formatCurrency(stake)} />
      <Block label="Total Payout" value={formatCurrency(payout)} />
      <Block
        label="House P/L"
        value={formatWinLoss(winloss)}
        className={winloss >= 0 ? 'text-green-600' : 'text-red-600'}
      />
      <Block label="Total Players" value={players.toLocaleString()} />
      <Block label="Total Tickets" value={tickets.toLocaleString()} />
      <Block
        label="Average Stake per Ticket"
        value={formatCurrency(averageStake)}
      />
    </div>
  );
}
