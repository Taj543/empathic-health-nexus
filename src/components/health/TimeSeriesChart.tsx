
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { fetchHealthData, HealthDataSource } from '@/services/healthDataService';

interface TimeSeriesChartProps {
  metric: string;
  dataSource: HealthDataSource;
  timeframe?: 'daily' | 'weekly' | 'monthly';
}

export function TimeSeriesChart({ metric, dataSource, timeframe = 'weekly' }: TimeSeriesChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const endDate = new Date();
      let startDate = new Date();
      
      // Set date range based on timeframe
      switch (timeframe) {
        case 'daily':
          startDate.setDate(endDate.getDate() - 1);
          break;
        case 'weekly':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case 'monthly':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
      }
      
      try {
        const healthData = await fetchHealthData(dataSource, metric, startDate, endDate);
        setData(healthData);
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [metric, dataSource, timeframe]);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-gray-500">Loading chart data...</div>
      </div>
    );
  }

  const getChartColor = (metric: string) => {
    switch (metric) {
      case 'heartRate':
        return '#ef4444'; // red
      case 'bloodPressure':
        return '#3b82f6'; // blue
      case 'spO2':
        return '#10b981'; // green
      case 'steps':
        return '#8b5cf6'; // purple
      case 'calories':
        return '#f59e0b'; // amber
      default:
        return '#6b7280'; // gray
    }
  };

  const formatYAxisLabel = (value: number) => {
    if (metric === 'steps' && value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const formatTooltipValue = (value: number) => {
    switch (metric) {
      case 'heartRate':
        return `${value} bpm`;
      case 'bloodPressure':
        return `${value} mmHg`;
      case 'spO2':
        return `${value}%`;
      case 'steps':
        return `${value.toLocaleString()} steps`;
      case 'calories':
        return `${value} kcal`;
      default:
        return value.toString();
    }
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={formatYAxisLabel}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px'
            }}
            formatter={(value: number) => [formatTooltipValue(value), metric]}
          />
          
          {/* Target line if available */}
          {data.length > 0 && data[0].target && (
            <ReferenceLine 
              y={data[0].target} 
              stroke={getChartColor(metric)} 
              strokeDasharray="5 5" 
              strokeOpacity={0.5}
            />
          )}
          
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getChartColor(metric)}
            strokeWidth={3}
            dot={{ r: 4, fill: getChartColor(metric) }}
            activeDot={{ r: 6, fill: getChartColor(metric) }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
