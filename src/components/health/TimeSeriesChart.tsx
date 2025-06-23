
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine, ComposedChart
} from 'recharts';
import { cn } from '@/lib/utils';
import { fetchHealthData, HealthDataSource } from '@/services/healthDataService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

interface TimeSeriesChartProps {
  metric: string;
  className?: string;
  dataSource?: HealthDataSource;
}

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

export function TimeSeriesChart({ metric, className, dataSource = 'local' }: TimeSeriesChartProps) {
  const [data, setData] = useState<Record<string, DataPoint[]>>({
    daily: [],
    weekly: [],
    monthly: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('weekly');
  
  const config = metricConfigs[metric] || {
    label: 'Value',
    color: '#8884d8',
    unit: '',
    dataKey: 'value'
  };
  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        
        const endDate = new Date();
        
        // Daily data (last 24 hours)
        const dailyStartDate = new Date();
        dailyStartDate.setDate(dailyStartDate.getDate() - 1);
        
        // Weekly data (last 7 days)
        const weeklyStartDate = new Date();
        weeklyStartDate.setDate(weeklyStartDate.getDate() - 7);
        
        // Monthly data (last 30 days)
        const monthlyStartDate = new Date();
        monthlyStartDate.setDate(monthlyStartDate.getDate() - 30);
        
        const [dailyData, weeklyData, monthlyData] = await Promise.all([
          fetchHealthData(dataSource, metric, dailyStartDate, endDate),
          fetchHealthData(dataSource, metric, weeklyStartDate, endDate),
          fetchHealthData(dataSource, metric, monthlyStartDate, endDate)
        ]);
        
        setData({
          daily: dailyData,
          weekly: weeklyData,
          monthly: monthlyData
        });
      } catch (error) {
        console.error('Error fetching health data:', error);
        // Fallback data
        setData({
          daily: Array.from({ length: 24 }, (_, i) => ({
            time: `${i}:00`,
            value: Math.floor(Math.random() * 100),
            target: config.targetValue
          })),
          weekly: Array.from({ length: 7 }, (_, i) => ({
            time: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
            value: Math.floor(Math.random() * 100),
            target: config.targetValue
          })),
          monthly: Array.from({ length: 30 }, (_, i) => ({
            time: `Day ${i + 1}`,
            value: Math.floor(Math.random() * 100),
            target: config.targetValue
          }))
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [metric, dataSource, config.targetValue]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-gray-500">
          {config.label}
          {dataSource !== 'local' && (
            <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full">{dataSource}</span>
          )}
        </div>
        <div className="text-xs text-gray-500">
          Target: {config.targetValue} {config.unit}
        </div>
      </div>
      
      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        
        {['daily', 'weekly', 'monthly'].map((period) => (
          <TabsContent key={period} value={period} className="mt-0">
            <ResponsiveContainer width="100%" height={250}>
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-sm text-gray-500">Loading data...</div>
                </div>
              ) : (
                <ComposedChart data={data[period as keyof typeof data]}>
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
                    activeDot={{ r: 4, className: "animate-pulse" }}
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
              )}
            </ResponsiveContainer>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
