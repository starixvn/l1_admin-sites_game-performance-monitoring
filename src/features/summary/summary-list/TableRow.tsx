import { DailySummary } from '@/features/summary/models/DailySummary';

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
    return showHour
      ? d.toISOString().split('.')[0].replace('T', ' ').slice(0, -3)
      : d.toISOString().split('T')[0];
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
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.stake.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.payout.toLocaleString()}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${summary.winloss >= 0 ? 'text-green-600' : 'text-red-600'}`}
      >
        {summary.winloss.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.tickets}
      </td>
    </tr>
  );
}
