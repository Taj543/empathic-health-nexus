
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklySummaryChart } from "./WeeklySummaryChart";
import { Heart, Activity } from "lucide-react";

export function WeeklySummaryTabs() {
  return (
    <Tabs defaultValue="heartRate">
      <div className="mb-3">
        <h2 className="text-lg font-semibold mb-2">Weekly Summary</h2>
        <TabsList className="w-full bg-muted">
          <TabsTrigger value="heartRate" className="flex items-center gap-2">
            <Heart size={16} /> Heart Rate
          </TabsTrigger>
          <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
          <TabsTrigger value="spO2">SpO₂</TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity size={16} /> Activity
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="heartRate">
        <WeeklySummaryChart metric="heartRate" />
      </TabsContent>
      
      <TabsContent value="bloodPressure">
        <WeeklySummaryChart metric="bloodPressure" />
      </TabsContent>
      
      <TabsContent value="spO2">
        <WeeklySummaryChart metric="spO2" />
      </TabsContent>
      
      <TabsContent value="activity">
        <Tabs defaultValue="steps" className="w-full">
          <TabsList className="w-full bg-muted">
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="calories">Calories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="steps" className="mt-2">
            <WeeklySummaryChart metric="steps" />
          </TabsContent>
          
          <TabsContent value="calories" className="mt-2">
            <WeeklySummaryChart metric="calories" />
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
}
