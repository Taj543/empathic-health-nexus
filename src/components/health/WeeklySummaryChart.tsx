import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine, Area, ComposedChart
} from 'recharts';
import { cn } from '@/lib/utils';

interface DataPoint {
  time: string;
  value: number;
}

interface WeeklySummaryChartProps {
  metric: string;
  className?: string;
}

export function WeeklySummaryChart({ metric, className }: WeeklySummaryChartProps) {
  const [data, setData] = useState<DataPoint[]>([
    { time: 'Mon', value: Math.floor(Math.random() * 100) },
    { time: 'Tue', value: Math.floor(Math.random() * 100) },
    { time: 'Wed', value: Math.floor(Math.random() * 100) },
    { time: 'Thu', value: Math.floor(Math.random() * 100) },
    { time: 'Fri', value: Math.floor(Math.random() * 100) },
    { time: 'Sat', value: Math.floor(Math.random() * 100) },
    { time: 'Sun', value: Math.floor(Math.random() * 100) },
  ]);

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis dataKey="time" className="text-xs text-gray-500 dark:text-gray-400" />
          <YAxis className="text-xs text-gray-500 dark:text-gray-400" />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
