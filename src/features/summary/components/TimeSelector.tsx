'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TimeSelectorProps {
  defaultDate: Date;
}

export default function TimeSelector({ defaultDate }: TimeSelectorProps) {
  const router = useRouter();

  // Initialize with start of hour
  const initialDate = new Date(defaultDate);
  initialDate.setMinutes(0);
  initialDate.setSeconds(0);
  initialDate.setMilliseconds(0);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedHour, setSelectedHour] = useState(initialDate.getHours());

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    // Set to start of selected hour
    newDate.setHours(selectedHour, 0, 0, 0);
    setSelectedDate(newDate);
    updateURL(newDate);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hour = parseInt(e.target.value);
    const newDate = new Date(selectedDate);
    // Set to start of selected hour
    newDate.setHours(hour, 0, 0, 0);
    setSelectedHour(hour);
    updateURL(newDate);
  };

  const updateURL = (date: Date) => {
    const params = new URLSearchParams();
    params.set('time', date.toISOString());
    router.push(`/hourly?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <select
        value={selectedHour}
        onChange={handleHourChange}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour.toString().padStart(2, '0')}:00
          </option>
        ))}
      </select>
      <span className="text-gray-500">
        Selected time: {selectedDate.toLocaleString()}
      </span>
    </div>
  );
}
