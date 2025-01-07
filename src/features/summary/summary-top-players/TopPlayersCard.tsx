interface TopPlayersCardProps {
  players: {
    playerId: string;
    stake: number;
    win: number;
  }[];
}

export default function TopPlayersCard({ players }: TopPlayersCardProps) {
  return (
    <div className="col-span-2 bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Top 10 Winning Players
        </h3>
        {players.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.map((player, index) => (
              <div
                key={player.playerId}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-8">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-medium">
                    Player {player.playerId}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    Stake: {player.stake.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600">
                    Win: {player.win.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-4">No Players</div>
        )}
      </div>
    </div>
  );
}
