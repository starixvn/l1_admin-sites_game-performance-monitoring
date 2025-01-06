interface TopGame {
  gameId: string;
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
    <div
      className={`rounded-lg shadow p-4 ${isProfit ? 'bg-green-50' : 'bg-red-50'}`}
    >
      <h2
        className={`text-lg font-semibold mb-3 ${isProfit ? 'text-green-700' : 'text-red-700'}`}
      >
        {title}
      </h2>
      <div className="space-y-2">
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
              Game {game.gameId}
            </span>
            <span
              className={`font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}
            >
              {game.currency} {game.winloss.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
