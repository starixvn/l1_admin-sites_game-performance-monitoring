import { formatCurrency, formatToGMT7, formatWinLoss } from '@/utils/format';

interface TableRowProps {
  summary: {
    time: string;
    gameName: string;
    currency: string;
    stake: number;
    payout: number;
    winloss: number;
    tickets: number;
  };
  showHour?: boolean;
}

export default function TableRow({ summary, showHour }: TableRowProps) {
  // Format date to YYYY-MM-DD or YYYY-MM-DD HH:00 if showHour is true
  const formatDate = (date: string) => {
    const d = new Date(date);
    return showHour ? formatToGMT7(d) : d.toISOString().split('T')[0];
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(summary.time)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.gameName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {summary.currency}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {formatCurrency(summary.stake)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {formatCurrency(summary.payout)}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
          summary.winloss >= 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {formatWinLoss(summary.winloss)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {summary.tickets.toLocaleString()}
      </td>
    </tr>
  );
}
