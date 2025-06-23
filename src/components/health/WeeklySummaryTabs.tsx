
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeSeriesChart } from "./TimeSeriesChart";
import { Heart, Activity, BarChart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { HealthDataSource } from "@/services/healthDataService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface WeeklySummaryTabsProps {
  onDataSourceChange?: (source: HealthDataSource) => void;
}

export function WeeklySummaryTabs({ onDataSourceChange }: WeeklySummaryTabsProps) {
  const [dataSource, setDataSource] = useState<HealthDataSource>('local');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  const handleDataSourceChange = (source: HealthDataSource) => {
    setDataSource(source);
    if (onDataSourceChange) {
      onDataSourceChange(source);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Health Analytics</h2>
        <Link 
          to="/health-connections"
          className="flex items-center gap-2 px-4 py-2 text-sm bg-health-primary text-white rounded-full hover:bg-health-primary/90 transition-colors"
        >
          <Settings size={16} />
          Connect Data Sources
        </Link>
      </div>

      {/* Timeframe selector */}
      <div className="mb-6">
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full p-1 w-fit">
          <button
            onClick={() => setTimeframe('daily')}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all",
              timeframe === 'daily' 
                ? "bg-white dark:bg-gray-600 shadow-sm text-health-primary" 
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            )}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all",
              timeframe === 'weekly' 
                ? "bg-white dark:bg-gray-600 shadow-sm text-health-primary" 
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            )}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all",
              timeframe === 'monthly' 
                ? "bg-white dark:bg-gray-600 shadow-sm text-health-primary" 
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      <Tabs defaultValue="heartRate" className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full bg-background border-b border-gray-200 dark:border-gray-700 rounded-none h-auto p-0 flex">
            <TabsTrigger 
              value="heartRate" 
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-health-primary data-[state=active]:bg-transparent text-sm"
            >
              <Heart size={16} className="text-health-danger" />
              <span>Heart Rate</span>
            </TabsTrigger>
            <TabsTrigger 
              value="bloodPressure"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-health-primary data-[state=active]:bg-transparent text-sm"
            >
              <BarChart size={16} className="text-health-primary" />
              <span>Blood Pressure</span>
            </TabsTrigger>
            <TabsTrigger 
              value="spO2"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-health-primary data-[state=active]:bg-transparent text-sm"
            >
              <Activity size={16} className="text-health-success" />
              <span>SpO₂</span>
            </TabsTrigger>
            <TabsTrigger 
              value="activity"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-health-primary data-[state=active]:bg-transparent text-sm"
            >
              <Activity size={16} className="text-health-accent" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
        
        <TabsContent value="heartRate" className="mt-6">
          <TimeSeriesChart metric="heartRate" dataSource={dataSource} timeframe={timeframe} />
        </TabsContent>
        
        <TabsContent value="bloodPressure" className="mt-6">
          <TimeSeriesChart metric="bloodPressure" dataSource={dataSource} timeframe={timeframe} />
        </TabsContent>
        
        <TabsContent value="spO2" className="mt-6">
          <TimeSeriesChart metric="spO2" dataSource={dataSource} timeframe={timeframe} />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="w-full mb-4 rounded-full overflow-hidden bg-gray-100 p-1">
              <TabsTrigger value="steps" className="flex-1 rounded-full text-sm py-2">Steps</TabsTrigger>
              <TabsTrigger value="calories" className="flex-1 rounded-full text-sm py-2">Calories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="steps" className="mt-0">
              <TimeSeriesChart metric="steps" dataSource={dataSource} timeframe={timeframe} />
            </TabsContent>
            
            <TabsContent value="calories" className="mt-0">
              <TimeSeriesChart metric="calories" dataSource={dataSource} timeframe={timeframe} />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
