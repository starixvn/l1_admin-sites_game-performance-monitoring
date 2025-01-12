import { formatCurrency, formatWinLoss } from '@/utils/format';
import SettlementResult from '../SettlementResult';

interface TableRowProps {
  ticket: {
    roundId: number;
    gameId: number;
    stake: number;
    payout: number;
    refund: number;
    winloss: number;
    time: string;
    settlementResult: any;
  };
}

export default function TableRow({ ticket }: TableRowProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-bold text-gray-900">{ticket.roundId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {ticket.gameId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(ticket.time)}
        {ticket.settlementResult && (
          <SettlementResult result={ticket.settlementResult} />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {formatCurrency(ticket.stake)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {formatCurrency(ticket.payout)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {formatCurrency(ticket.refund)}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
          ticket.winloss >= 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {formatWinLoss(ticket.winloss)}
      </td>
    </tr>
  );
}
