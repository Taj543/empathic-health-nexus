
import React from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HealthMetricGridProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  centerLastItem?: boolean;
}

export function HealthMetricGrid({ 
  children, 
  className, 
  scrollable = false,
  centerLastItem = false 
}: HealthMetricGridProps) {
  
  if (scrollable) {
    return (
      <div className={cn("w-full overflow-x-auto android-scroll scrollbar-none pb-2 -mx-1 px-1", className)}>
        <div className="grid grid-flow-col auto-cols-[130px] md:auto-cols-[150px] gap-3 w-max mx-auto">
          {children}
        </div>
      </div>
    );
  }
  
  // Always use a simple 2-column grid layout with improved spacing
  return (
    <div className={cn("grid grid-cols-2 gap-3 mx-auto w-full", className)}>
      {children}
    </div>
  );
}
