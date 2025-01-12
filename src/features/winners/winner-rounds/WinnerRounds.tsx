import { formatCurrency, formatWinLoss } from '@/utils/format';
import SettlementResult from './SettlementResult';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';

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
  tickets: Ticket[];
}

export default function WinnerRounds({ tickets }: WinnerRoundsProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Round Details
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader />
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <TableRow key={ticket.roundId} ticket={ticket} />
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
