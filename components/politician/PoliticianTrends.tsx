'use client';

import { useState, useEffect } from 'react';
import { TimeRange } from '@/types';
import { PopularityChart } from '@/components/data/PopularityChart';
import { generatePopularityData } from '@/lib/data/mock-data';
import { cn } from '@/lib/utils';

interface PoliticianTrendsProps {
  politicianId: string;
  politicianName: string;
}

const timeRanges: { value: TimeRange; label: string }[] = [
  { value: '24h', label: '24h' },
  { value: '7d', label: '7j' },
  { value: '30d', label: '30j' },
  { value: '90d', label: '90j' },
];

export function PoliticianTrends({ politicianId, politicianName }: PoliticianTrendsProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('7d');
  const [data, setData] = useState(generatePopularityData(politicianId, '7d'));

  useEffect(() => {
    setData(generatePopularityData(politicianId, selectedRange));
  }, [politicianId, selectedRange]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tendances de popularité</h2>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedRange === range.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <PopularityChart data={data} politicianName={politicianName} />
    </div>
  );
}
