interface WinnerRoundsProps {
  roundIds: number[];
}

export default function WinnerRounds({ roundIds }: WinnerRoundsProps) {
  // Flatten and deduplicate round IDs
  const uniqueRoundIds = [...new Set(roundIds.flat())];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Round IDs
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {uniqueRoundIds.map((roundId) => (
            <div
              key={roundId}
              className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-600"
            >
              {roundId}
            </div>
          ))}
        </div>
        {uniqueRoundIds.length === 0 && (
          <div className="text-gray-500 text-center py-4">No rounds found</div>
        )}
      </div>
    </div>
  );
}
