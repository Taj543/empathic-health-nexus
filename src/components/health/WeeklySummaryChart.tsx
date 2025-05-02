
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine, Area, ComposedChart
} from 'recharts';
import { cn } from '@/lib/utils';
import { fetchHealthData, HealthDataSource } from '@/services/healthDataService';

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
  dataSource?: HealthDataSource;
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
    const fetchData = async () => {
      try {
        if (dataSource !== 'local') {
          // Get the current date and subtract 7 days to get the start date for weekly data
          const endDate = new Date();
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          
          // Fetch data from the health service
          const healthData = await fetchHealthData(dataSource, metric, startDate, endDate);
          
          // Add target property to each data point if config has a targetValue
          if (config.targetValue) {
            const dataWithTargets = healthData.map(point => ({
              ...point,
              target: config.targetValue
            }));
            setData(dataWithTargets);
          } else {
            setData(healthData);
          }
        } else {
          // Just use random data for local source with targets if needed
          const localData = data.map(point => ({
            ...point,
            ...(config.targetValue ? { target: config.targetValue } : {})
          }));
          setData(localData);
        }
      } catch (error) {
        console.error('Error fetching health data:', error);
        // In case of error, use local data with targets if needed
        const localData = data.map(point => ({
          ...point,
          ...(config.targetValue ? { target: config.targetValue } : {})
        }));
        setData(localData);
      }
    };
    
    fetchData();
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
