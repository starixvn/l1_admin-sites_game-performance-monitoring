import { formatCurrency, formatWinLoss } from '@/utils/format';
import SettlementResult from './SettlementResult';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';
import { Bet } from '../models/Bet';

interface Ticket {
  roundId: number;
  gameId: number;
  stake: number;
  payout: number;
  refund: number;
  winloss: number;
  time: string;
  settlementResult: any;
}

interface WinnerRoundsProps {
  tickets: Array<{
    roundId: number;
    gameId: number;
    stake: number;
    payout: number;
    refund: number;
    winloss: number;
    time: string;
    settlementResult: any;
    betDetails: Bet | null;
  }>;
  date: string;
}

export default function WinnerRounds({ tickets, date }: WinnerRoundsProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Round Details - {formatDate(date)}
        </h3>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader />
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <TableRow key={ticket.roundId} ticket={ticket} date={date} />
              ))}
            </tbody>
          </table>
        </div>
        {tickets.length === 0 && (
          <div className="text-gray-500 text-center py-4">No rounds found</div>
        )}
      </div>
    </div>
  );
}
