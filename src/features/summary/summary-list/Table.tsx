'use client';

import { useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import type { DailySummary } from '@/features/summary/models/DailySummary';

interface SummaryTableProps {
  initialData: DailySummary[];
}

export default function SummaryTable({ initialData }: SummaryTableProps) {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({
    key: 'time',
    direction: 'desc',
  });

  const handleSort = async (key: string) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const res = await fetch(`/api/summaries?sortBy=${key}&order=${direction}`);
    const newData = await res.json();
    setData(newData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <TableHeader onSort={handleSort} sortConfig={sortConfig} />
        <tbody>
          {data.map((summary) => (
            <TableRow key={summary.gameId} summary={summary} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
