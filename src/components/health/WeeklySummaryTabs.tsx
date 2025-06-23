
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeSeriesChart } from "./TimeSeriesChart";
import { Heart, Activity, BarChart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HealthDataSourceSelector } from "./HealthDataSourceSelector";
import { HealthDataSource } from "@/services/healthDataService";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WeeklySummaryTabsProps {
  onDataSourceChange?: (source: HealthDataSource) => void;
}

export function WeeklySummaryTabs({ onDataSourceChange }: WeeklySummaryTabsProps) {
  const [dataSource, setDataSource] = useState<HealthDataSource>('local');
  
  const handleDataSourceChange = (source: HealthDataSource) => {
    setDataSource(source);
    if (onDataSourceChange) {
      onDataSourceChange(source);
    }
  };
  
  return (
    <Tabs defaultValue="heartRate" className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">Health Analytics</h2>
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
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <HealthDataSourceSelector 
          selectedSource={dataSource} 
          onSourceSelect={(sourceId) => handleDataSourceChange(sourceId as HealthDataSource)} 
          className="mb-6"
        />
        
        <TabsContent value="heartRate" className="mt-0">
          <TimeSeriesChart metric="heartRate" dataSource={dataSource} />
        </TabsContent>
        
        <TabsContent value="bloodPressure" className="mt-0">
          <TimeSeriesChart metric="bloodPressure" dataSource={dataSource} />
        </TabsContent>
        
        <TabsContent value="spO2" className="mt-0">
          <TimeSeriesChart metric="spO2" dataSource={dataSource} />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-0">
          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="w-full mb-4 rounded-full overflow-hidden bg-gray-100 p-1">
              <TabsTrigger value="steps" className="flex-1 rounded-full text-sm py-2">Steps</TabsTrigger>
              <TabsTrigger value="calories" className="flex-1 rounded-full text-sm py-2">Calories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="steps" className="mt-0">
              <TimeSeriesChart metric="steps" dataSource={dataSource} />
            </TabsContent>
            
            <TabsContent value="calories" className="mt-0">
              <TimeSeriesChart metric="calories" dataSource={dataSource} />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </div>
    </Tabs>
  );
}
