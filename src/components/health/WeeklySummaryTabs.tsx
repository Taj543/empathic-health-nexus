
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklySummaryChart } from "./WeeklySummaryChart";
import { Heart, Activity, Lungs, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

export function WeeklySummaryTabs() {
  return (
    <Tabs defaultValue="heartRate" className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-3">Weekly Health Summary</h2>
        <TabsList className="w-full bg-muted grid grid-cols-4 h-auto p-1">
          <TabsTrigger 
            value="heartRate" 
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            <Heart size={16} className="text-health-danger" />
            <span className="text-xs">Heart</span>
          </TabsTrigger>
          <TabsTrigger 
            value="bloodPressure"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            <BarChart size={16} className="text-health-primary" />
            <span className="text-xs">BP</span>
          </TabsTrigger>
          <TabsTrigger 
            value="spO2"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            <Lungs size={16} className="text-health-success" />
            <span className="text-xs">SpO₂</span>
          </TabsTrigger>
          <TabsTrigger 
            value="activity"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            <Activity size={16} className="text-health-accent" />
            <span className="text-xs">Activity</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <TabsContent value="heartRate" className="mt-0">
          <WeeklySummaryChart metric="heartRate" className="mt-2" />
        </TabsContent>
        
        <TabsContent value="bloodPressure" className="mt-0">
          <WeeklySummaryChart metric="bloodPressure" className="mt-2" />
        </TabsContent>
        
        <TabsContent value="spO2" className="mt-0">
          <WeeklySummaryChart metric="spO2" className="mt-2" />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-0">
          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="w-full bg-muted mb-4">
              <TabsTrigger value="steps" className="flex-1">Steps</TabsTrigger>
              <TabsTrigger value="calories" className="flex-1">Calories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="steps" className="mt-0">
              <WeeklySummaryChart metric="steps" />
            </TabsContent>
            
            <TabsContent value="calories" className="mt-0">
              <WeeklySummaryChart metric="calories" />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </div>
    </Tabs>
  );
}
