import { DailySummary } from '@/models/DailySummary';

interface TableRowProps {
  summary: DailySummary;
}

export default function TableRow({ summary }: TableRowProps) {
  // Format date to YYYY-MM-DD
  const formatDate = (date: Date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(summary.time)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.gameId}
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
