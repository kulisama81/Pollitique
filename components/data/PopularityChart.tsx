'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PopularityDataPoint } from '@/types';

interface PopularityChartProps {
  data: PopularityDataPoint[];
  politicianName: string;
}

export function PopularityChart({ data }: PopularityChartProps) {
  const chartData = data.map((point) => ({
    date: format(point.date, 'dd MMM', { locale: fr }),
    fullDate: format(point.date, 'dd MMMM yyyy', { locale: fr }),
    score: point.score,
    followers: point.twitterFollowers.toLocaleString('fr-FR'),
    engagement: point.engagementRate.toFixed(1),
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis
            domain={[0, 100]}
            stroke="#6b7280"
            style={{ fontSize: '0.75rem' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '0.75rem',
            }}
            labelStyle={{ color: '#374151', fontWeight: 'bold', marginBottom: '0.5rem' }}
            formatter={(value: number | undefined, name: string | undefined) => {
              if (!value) return [0, name || ''];
              if (name === 'score') {
                return [value.toFixed(1), 'Score de popularité'];
              }
              return [value, name || ''];
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
