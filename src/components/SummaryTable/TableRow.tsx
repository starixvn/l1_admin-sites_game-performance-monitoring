import { DailySummary } from '@/models/DailySummary';

interface TableRowProps {
  summary: DailySummary;
}

export default function TableRow({ summary }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(summary.time).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.gameId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.currency}{summary.stake.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.currency}{summary.payout.toLocaleString()}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${summary.winloss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {summary.currency}{summary.winloss.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {summary.tickets}
      </td>
    </tr>
  );
} 