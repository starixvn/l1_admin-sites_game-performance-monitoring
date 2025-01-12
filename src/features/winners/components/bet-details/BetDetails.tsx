import { formatCurrency } from '@/utils/format';
import { Bet } from '../../models/Bet';

interface BetDetailsProps {
  bet: Bet;
}

export default function BetDetails({ bet }: BetDetailsProps) {
  const bets = [
    { key: 'even', label: 'Even' },
    { key: 'odd', label: 'Odd' },
    { key: 'red2', label: 'Red 2' },
    { key: 'red3', label: 'Red 3' },
    { key: 'red4', label: 'Red 4' },
    { key: 'white3', label: 'White 3' },
    { key: 'white4', label: 'White 4' },
  ];

  return (
    <div className="text-xs text-gray-500 mt-1">
      {bets.map(({ key, label }) => {
        const amount = bet[key as keyof Bet] as number;
        if (amount > 0) {
          return (
            <div key={key} className="flex justify-between">
              <span>{label}:</span>
              <span>{formatCurrency(amount)}</span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
