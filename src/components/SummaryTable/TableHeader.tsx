interface TableHeaderProps {
  onSort: (key: string) => void;
  sortConfig: {
    key: string;
    direction: string;
  };
}

export default function TableHeader({ onSort, sortConfig }: TableHeaderProps) {
  const getSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        <th 
          onClick={() => onSort('time')}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        >
          Date {getSortIcon('time')}
        </th>
        <th 
          onClick={() => onSort('gameId')}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        >
          Game ID {getSortIcon('gameId')}
        </th>
        <th 
          onClick={() => onSort('stake')}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        >
          Stake {getSortIcon('stake')}
        </th>
        <th 
          onClick={() => onSort('payout')}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        >
          Payout {getSortIcon('payout')}
        </th>
        <th 
          onClick={() => onSort('winloss')}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        >
          Win/Loss {getSortIcon('winloss')}
        </th>
        <th 
          onClick={() => onSort('tickets')}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        >
          Tickets {getSortIcon('tickets')}
        </th>
      </tr>
    </thead>
  );
} 