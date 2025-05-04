
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
  
  const childrenArray = React.Children.toArray(children);
  
  if (scrollable) {
    return (
      <div className={cn("w-full overflow-x-auto android-scroll scrollbar-none pb-1 -mx-1 px-1", className)}>
        <div className="grid grid-flow-col auto-cols-[120px] md:auto-cols-[140px] gap-2 w-max mx-auto">
          {children}
        </div>
      </div>
    );
  }
  
  if (centerLastItem && childrenArray.length > 0) {
    const lastItem = childrenArray.pop();
    
    return (
      <div className={cn("w-[95%] max-w-xs mx-auto", className)}>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {childrenArray}
        </div>
        {lastItem && (
          <div className="flex justify-center">
            <div className="w-[calc(50%-4px)]">
              {lastItem}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={cn("grid grid-cols-2 gap-2 mx-auto w-[95%] max-w-xs", className)}>
      {children}
    </div>
  );
}
