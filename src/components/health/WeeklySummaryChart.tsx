
import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { format, subDays } from 'date-fns';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// Generate dummy data for the past week
const generateWeeklyData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      name: format(date, 'EEE'),
      date: format(date, 'MMM dd'),
      heartRate: Math.floor(Math.random() * (85 - 65) + 65),
      bloodPressureSystolic: Math.floor(Math.random() * (130 - 110) + 110),
      bloodPressureDiastolic: Math.floor(Math.random() * (90 - 70) + 70),
      spO2: Math.floor(Math.random() * (100 - 95) + 95),
      steps: Math.floor(Math.random() * (12000 - 5000) + 5000),
      calories: Math.floor(Math.random() * (2000 - 1000) + 1000),
    });
  }
  return data;
};

interface WeeklySummaryChartProps {
  className?: string;
  metric: 'heartRate' | 'bloodPressure' | 'spO2' | 'steps' | 'calories';
}

export function WeeklySummaryChart({ className, metric }: WeeklySummaryChartProps) {
  const data = useMemo(() => generateWeeklyData(), []);
  
  const metricConfig = {
    heartRate: {
      label: 'Heart Rate',
      color: '#EF4444',
      unit: 'bpm',
      dataKey: 'heartRate',
      targetValue: 72,
      minValue: 60,
      maxValue: 90
    },
    bloodPressure: {
      label: 'Blood Pressure',
      systolicColor: '#3B82F6',
      diastolicColor: '#60A5FA',
      unit: 'mmHg',
      targetSystolic: 120,
      targetDiastolic: 80
    },
    spO2: {
      label: 'SpO₂',
      color: '#10B981',
      unit: '%',
      dataKey: 'spO2',
      targetValue: 98,
      minValue: 95
    },
    steps: {
      label: 'Steps',
      color: '#8B5CF6',
      dataKey: 'steps',
      targetValue: 10000
    },
    calories: {
      label: 'Calories',
      color: '#F59E0B',
      unit: 'kcal',
      dataKey: 'calories',
      targetValue: 1500
    }
  };

  // Create a config for chart colors based on the metric
  const config = {
    [metric]: {
      theme: {
        light: metric === 'bloodPressure' 
          ? metricConfig.bloodPressure.systolicColor 
          : metricConfig[metric].color,
        dark: metric === 'bloodPressure' 
          ? metricConfig.bloodPressure.systolicColor 
          : metricConfig[metric].color
      }
    },
    systolic: {
      theme: {
        light: metricConfig.bloodPressure.systolicColor,
        dark: metricConfig.bloodPressure.systolicColor
      }
    },
    diastolic: {
      theme: {
        light: metricConfig.bloodPressure.diastolicColor,
        dark: metricConfig.bloodPressure.diastolicColor
      }
    }
  };
  
  // Get the appropriate target value for reference lines based on metric
  const getTargetValue = () => {
    if (metric === 'bloodPressure') return null;
    return metricConfig[metric].targetValue;
  };
  
  const targetValue = getTargetValue();
  
  // Custom tooltip formatter based on metric
  const formatTooltipValue = (value: number, name: string) => {
    if (name === "Heart Rate") return `${value} bpm`;
    if (name === "SpO₂") return `${value}%`;
    if (name === "Systolic" || name === "Diastolic") return `${value} mmHg`;
    if (name === "Steps") return value.toLocaleString();
    if (name === "Calories") return `${value} kcal`;
    return value;
  };
  
  const renderChart = () => {
    if (metric === 'bloodPressure') {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
            tickLine={{ stroke: '#94a3b8' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
            tickLine={{ stroke: '#94a3b8' }}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            formatter={formatTooltipValue} 
          />
          <Legend wrapperStyle={{ paddingTop: 10 }} />
          <ReferenceLine 
            y={120} 
            stroke="#3B82F6" 
            strokeDasharray="3 3" 
            label={{ value: "Target Systolic", position: "insideTopLeft", fill: "#3B82F6", fontSize: 10 }} 
          />
          <ReferenceLine 
            y={80} 
            stroke="#60A5FA" 
            strokeDasharray="3 3" 
            label={{ value: "Target Diastolic", position: "insideBottomLeft", fill: "#60A5FA", fontSize: 10 }} 
          />
          <Line 
            type="monotone" 
            dataKey="bloodPressureSystolic" 
            name="Systolic" 
            stroke={metricConfig.bloodPressure.systolicColor} 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }} 
          />
          <Line 
            type="monotone" 
            dataKey="bloodPressureDiastolic" 
            name="Diastolic" 
            stroke={metricConfig.bloodPressure.diastolicColor}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      );
    }
    
    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          stroke="#94a3b8"
          tickLine={{ stroke: '#94a3b8' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          stroke="#94a3b8"
          tickLine={{ stroke: '#94a3b8' }}
        />
        <ChartTooltip 
          content={<ChartTooltipContent />}
          formatter={formatTooltipValue}
        />
        <Legend wrapperStyle={{ paddingTop: 10 }} />
        {targetValue && (
          <ReferenceLine 
            y={targetValue} 
            stroke={metricConfig[metric].color} 
            strokeDasharray="3 3"
            label={{ 
              value: `Target: ${targetValue}${metricConfig[metric].unit ? ' ' + metricConfig[metric].unit : ''}`, 
              position: "insideTopLeft", 
              fill: metricConfig[metric].color, 
              fontSize: 10 
            }}
          />
        )}
        <Line 
          type="monotone" 
          dataKey={metricConfig[metric].dataKey} 
          name={metricConfig[metric].label} 
          stroke={metricConfig[metric].color}
          strokeWidth={2}
          dot={{ r: 4, fill: metricConfig[metric].color }}
          activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
        />
      </LineChart>
    );
  };

  return (
    <div className={cn(`h-[280px] w-full transition-all duration-300`, className)}>
      <div className="text-sm text-gray-500 mb-2 flex items-center justify-between">
        <span>
          {metric === 'bloodPressure' ? 
            'Blood Pressure Readings' : 
            `${metricConfig[metric].label} Trend`}
        </span>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
          Last 7 days
        </span>
      </div>
      <ChartContainer config={config}>
        {renderChart()}
      </ChartContainer>
    </div>
  );
}
