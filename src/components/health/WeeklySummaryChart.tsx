
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine, Area, ComposedChart
} from 'recharts';
import { cn } from '@/lib/utils';

// Define interfaces for our data structure
interface DataPoint {
  time: string;
  value: number;
  target?: number;
}

interface HealthMetricConfig {
  label: string;
  color: string;
  unit: string;
  dataKey: string;
  targetValue?: number;
  minValue?: number;
  maxValue?: number;
  source?: string;
}

interface WeeklySummaryChartProps {
  metric: string;
  className?: string;
  dataSource?: 'local' | 'googleFit' | 'appleHealth' | 'samsung' | 'fitbit';
}

// Define metric configurations
const metricConfigs: Record<string, HealthMetricConfig> = {
  heartRate: {
    label: 'Heart Rate',
    color: '#FF5757',
    unit: 'bpm',
    dataKey: 'value',
    targetValue: 70,
    minValue: 60,
    maxValue: 100
  },
  bloodPressure: {
    label: 'Blood Pressure',
    color: '#5271FF',
    unit: 'mmHg',
    dataKey: 'value',
    targetValue: 120,
    minValue: 90,
    maxValue: 140
  },
  spO2: {
    label: 'Oxygen Saturation',
    color: '#38BDF8',
    unit: '%',
    dataKey: 'value',
    targetValue: 98,
    minValue: 95,
    maxValue: 100
  },
  steps: {
    label: 'Steps',
    color: '#22C55E',
    unit: 'steps',
    dataKey: 'value',
    targetValue: 10000
  },
  calories: {
    label: 'Calories',
    color: '#FB923C',
    unit: 'kcal',
    dataKey: 'value',
    targetValue: 2000
  }
};

export function WeeklySummaryChart({ metric, className, dataSource = 'local' }: WeeklySummaryChartProps) {
  const [data, setData] = useState<DataPoint[]>([
    { time: 'Mon', value: Math.floor(Math.random() * 100) },
    { time: 'Tue', value: Math.floor(Math.random() * 100) },
    { time: 'Wed', value: Math.floor(Math.random() * 100) },
    { time: 'Thu', value: Math.floor(Math.random() * 100) },
    { time: 'Fri', value: Math.floor(Math.random() * 100) },
    { time: 'Sat', value: Math.floor(Math.random() * 100) },
    { time: 'Sun', value: Math.floor(Math.random() * 100) },
  ]);
  
  const config = metricConfigs[metric] || {
    label: 'Value',
    color: '#8884d8',
    unit: '',
    dataKey: 'value'
  };
  
  // In a real implementation, this would fetch data from the respective source
  useEffect(() => {
    // This is where we would connect to external services
    // For now, we'll just simulate different data for different sources
    if (dataSource !== 'local') {
      const simulatedData = [
        { time: 'Mon', value: Math.floor(Math.random() * 100) },
        { time: 'Tue', value: Math.floor(Math.random() * 100) },
        { time: 'Wed', value: Math.floor(Math.random() * 100) },
        { time: 'Thu', value: Math.floor(Math.random() * 100) },
        { time: 'Fri', value: Math.floor(Math.random() * 100) },
        { time: 'Sat', value: Math.floor(Math.random() * 100) },
        { time: 'Sun', value: Math.floor(Math.random() * 100) },
      ];
      
      // Add target lines for the data points
      if (config.targetValue) {
        simulatedData.forEach(point => {
          point.target = config.targetValue;
        });
      }
      
      setData(simulatedData);
      
      // In future, this would be replaced with real API calls:
      // Example: if (dataSource === 'googleFit') fetchGoogleFitData(metric);
    }
  }, [metric, dataSource]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium text-gray-500">
          {config.label}
          {dataSource !== 'local' && <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">{dataSource}</span>}
        </div>
        <div className="text-sm text-gray-500">
          Target: {config.targetValue} {config.unit}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis dataKey="time" className="text-xs text-gray-500 dark:text-gray-400" />
          <YAxis className="text-xs text-gray-500 dark:text-gray-400" />
          <Tooltip 
            formatter={(value: number) => [`${value} ${config.unit}`, config.label]}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={config.color} 
            strokeWidth={2} 
            dot={false} 
          />
          {config.targetValue && (
            <ReferenceLine 
              y={config.targetValue} 
              stroke="#FF8C00" 
              strokeDasharray="3 3"
              label={{ 
                value: `Target: ${config.targetValue} ${config.unit}`,
                fill: '#FF8C00',
                fontSize: 10,
                position: 'insideBottomRight'
              }} 
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
