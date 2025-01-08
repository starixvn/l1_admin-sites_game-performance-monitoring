interface WinnerStatsProps {
  stake: number;
  payout: number;
  win: number;
}

export default function WinnerStats({ stake, payout, win }: WinnerStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Stake</div>
        <div className="text-xl font-bold">{stake.toLocaleString()}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Payout</div>
        <div className="text-xl font-bold">{payout.toLocaleString()}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-gray-500 text-sm">Total Win</div>
        <div
          className={`text-xl font-bold ${win >= 0 ? 'text-green-600' : 'text-red-600'}`}
        >
          {win.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
