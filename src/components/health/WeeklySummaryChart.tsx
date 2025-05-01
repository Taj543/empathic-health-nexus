
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, subDays } from 'date-fns';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

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
  const data = generateWeeklyData();
  
  const metricConfig = {
    heartRate: {
      label: 'Heart Rate',
      color: '#EF4444',
      unit: 'bpm',
      dataKey: 'heartRate'
    },
    bloodPressure: {
      label: 'Blood Pressure',
      systolicColor: '#3B82F6',
      diastolicColor: '#60A5FA',
      unit: 'mmHg'
    },
    spO2: {
      label: 'SpO₂',
      color: '#10B981',
      unit: '%',
      dataKey: 'spO2'
    },
    steps: {
      label: 'Steps',
      color: '#8B5CF6',
      dataKey: 'steps'
    },
    calories: {
      label: 'Calories',
      color: '#F59E0B',
      unit: 'kcal',
      dataKey: 'calories'
    }
  };

  const config = {
    [metric]: {
      theme: {
        light: metricConfig[metric].color || '#3B82F6',
        dark: metricConfig[metric].color || '#3B82F6'
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
  
  const renderChart = () => {
    if (metric === 'bloodPressure') {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="bloodPressureSystolic" 
            name="Systolic" 
            stroke={metricConfig.bloodPressure.systolicColor} 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="bloodPressureDiastolic" 
            name="Diastolic" 
            stroke={metricConfig.bloodPressure.diastolicColor} 
          />
        </LineChart>
      );
    }
    
    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey={metricConfig[metric].dataKey} 
          name={metricConfig[metric].label} 
          stroke={metricConfig[metric].color} 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    );
  };

  return (
    <div className={`h-64 ${className}`}>
      <ChartContainer config={config}>
        {renderChart()}
      </ChartContainer>
    </div>
  );
}
