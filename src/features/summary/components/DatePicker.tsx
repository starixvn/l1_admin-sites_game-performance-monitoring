'use client';

import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

interface DatePickerProps {
  initialDate?: string;
}

export default function DatePicker({ initialDate }: DatePickerProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(
    initialDate ? new Date(initialDate) : new Date()
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    router.push(`/daily?date=${formattedDate}`);
  };

  return (
    <div className="inline-block">
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => handleDateChange(date as Date)}
        dateFormat="MMMM d, yyyy"
        className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        maxDate={new Date()}
      />
    </div>
  );
}
