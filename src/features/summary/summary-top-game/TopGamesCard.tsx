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
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {title}
        </h3>
        {games.length > 0 ? (
          <div className="space-y-4">
            {games.map((game, index) => (
              <div
                key={game.gameId}
                className={`flex justify-between items-center p-2 rounded ${
                  isProfit ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <span
                  className={`font-medium ${isProfit ? 'text-green-800' : 'text-red-800'}`}
                >
                  {game.gameName}
                </span>
                <span
                  className={`font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}
                >
                  {game.currency} {game.winloss.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-4">No Games</div>
        )}
      </div>
    </div>
  );
}
