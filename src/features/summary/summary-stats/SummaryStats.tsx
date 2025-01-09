import { formatCurrency, formatWinLoss } from '@/utils/format';

interface SummaryStatsProps {
  totalStake: number;
  totalPayout: number;
  totalWinLoss: number;
}

export default function SummaryStats({
  totalStake = 0,
  totalPayout = 0,
  totalWinLoss = 0,
}: SummaryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Stake</div>
        <div className="text-xl font-bold text-right">
          {formatCurrency(totalStake)}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Payout</div>
        <div className="text-xl font-bold text-right">
          {formatCurrency(totalPayout)}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Win/Loss</div>
        <div
          className={`text-xl font-bold text-right ${
            totalWinLoss >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {formatWinLoss(totalWinLoss)}
        </div>
      </div>
    </div>
  );
}
