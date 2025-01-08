import { formatCurrency, formatWinLoss } from '@/utils/format';

interface WinnerStatsProps {
  stake: number;
  payout: number;
  winloss: number;
}

export default function WinnerStats({
  stake,
  payout,
  winloss,
}: WinnerStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Stake</div>
        <div className="text-xl font-bold text-right">
          {formatCurrency(stake)}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Payout</div>
        <div className="text-xl font-bold text-right">
          {formatCurrency(payout)}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Win/Loss</div>
        <div
          className={`text-xl font-bold text-right ${
            winloss >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {formatWinLoss(winloss)}
        </div>
      </div>
    </div>
  );
}
