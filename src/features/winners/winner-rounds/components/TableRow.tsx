'use client';

import { formatCurrency, formatWinLoss } from '@/utils/format';
import SettlementResult from '../SettlementResult';
import BetDetails from '../BetDetails';
import { Bet } from '../../models/Bet';

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
    betDetails: Bet | null;
  };
  date: string; // Add date prop
}

export default function TableRow({ ticket, date }: TableRowProps) {
  const formatTime = (time: string) => {
    const timeDate = new Date(time);
    return timeDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok',
    });
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-bold text-gray-900">{ticket.roundId}</div>
        <div className="text-xs text-gray-500">
          {formatTime(ticket.time)} GMT+7
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {ticket.gameId}
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
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {ticket.betDetails && <BetDetails bet={ticket.betDetails} />}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {ticket.settlementResult && (
          <SettlementResult result={ticket.settlementResult} />
        )}
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
