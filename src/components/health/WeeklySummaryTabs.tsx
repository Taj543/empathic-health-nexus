
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklySummaryChart } from "./WeeklySummaryChart";
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
  
  // Update the data source and notify parent component if callback is provided
  const handleDataSourceChange = (source: HealthDataSource) => {
    setDataSource(source);
    if (onDataSourceChange) {
      onDataSourceChange(source);
    }
  };
  
  return (
    <Tabs defaultValue="heartRate" className="w-full">
      <div className="mb-2">
        <h2 className="text-sm font-semibold mb-1">Weekly Health Summary</h2>
        <ScrollArea className="w-full">
          <TabsList className="w-full bg-background border-b border-gray-200 dark:border-gray-700 rounded-none h-auto p-0 flex">
            <TabsTrigger 
              value="heartRate" 
              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-health-primary data-[state=active]:bg-transparent text-xs"
            >
              <Heart size={12} className="text-health-danger" />
              <span>Heart</span>
            </TabsTrigger>
            <TabsTrigger 
              value="bloodPressure"
              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-health-primary data-[state=active]:bg-transparent text-xs"
            >
              <BarChart size={12} className="text-health-primary" />
              <span>BP</span>
            </TabsTrigger>
            <TabsTrigger 
              value="spO2"
              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-health-primary data-[state=active]:bg-transparent text-xs"
            >
              <Activity size={12} className="text-health-success" />
              <span>SpO₂</span>
            </TabsTrigger>
            <TabsTrigger 
              value="activity"
              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-health-primary data-[state=active]:bg-transparent text-xs"
            >
              <Activity size={12} className="text-health-accent" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-2.5 shadow-sm border border-gray-100 dark:border-gray-700">
        <HealthDataSourceSelector 
          selectedSource={dataSource} 
          onSourceSelect={(sourceId) => handleDataSourceChange(sourceId as HealthDataSource)} 
          className="mb-2"
        />
        
        <TabsContent value="heartRate" className="mt-0">
          <WeeklySummaryChart metric="heartRate" dataSource={dataSource} className="mt-1" />
        </TabsContent>
        
        <TabsContent value="bloodPressure" className="mt-0">
          <WeeklySummaryChart metric="bloodPressure" dataSource={dataSource} className="mt-1" />
        </TabsContent>
        
        <TabsContent value="spO2" className="mt-0">
          <WeeklySummaryChart metric="spO2" dataSource={dataSource} className="mt-1" />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-0">
          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="w-full mb-2 rounded-full overflow-hidden bg-gray-100 p-0.5">
              <TabsTrigger value="steps" className="flex-1 rounded-full text-xs py-1">Steps</TabsTrigger>
              <TabsTrigger value="calories" className="flex-1 rounded-full text-xs py-1">Calories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="steps" className="mt-0">
              <WeeklySummaryChart metric="steps" dataSource={dataSource} />
            </TabsContent>
            
            <TabsContent value="calories" className="mt-0">
              <WeeklySummaryChart metric="calories" dataSource={dataSource} />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </div>
    </Tabs>
  );
}
