import { formatWinLoss } from '@/utils/format';

interface TopGame {
  gameId: string;
  gameName: string;
  winloss: number;
  currency: string;
}

interface TopGamesCardProps {
  title: string;
  games: TopGame[];
  isProfit: boolean;
}

export default function TopGamesCard({
  title,
  games,
  isProfit,
}: TopGamesCardProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title} ({games.length})
          </h3>
        </div>

        {games.length > 0 ? (
          <div className="max-h-[600px] overflow-y-auto">
            <div className="space-y-2">
              {games.map((game) => (
                <div
                  key={game.gameId}
                  className={`flex justify-between items-center p-3 rounded ${
                    isProfit ? 'bg-green-50' : 'bg-red-50'
                  } hover:${isProfit ? 'bg-green-100' : 'bg-red-100'} transition-colors`}
                >
                  <div className="flex-1">
                    <span
                      className={`font-medium ${
                        isProfit ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {game.gameName}
                    </span>
                  </div>
                  <span
                    className={`font-bold ml-4 tabular-nums ${
                      isProfit ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {formatWinLoss(game.winloss)} {game.currency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-4">No Games</div>
        )}
      </div>
    </div>
  );
}
