
import React from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HealthMetricGridProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}

export function HealthMetricGrid({ children, className, scrollable = false }: HealthMetricGridProps) {
  return scrollable ? (
    <div className={cn("w-full overflow-x-auto android-scroll scrollbar-none pb-1 -mx-1 px-1", className)}>
      <div className="grid grid-flow-col auto-cols-[120px] md:auto-cols-[140px] gap-2 w-max mx-auto">
        {children}
      </div>
    </div>
  ) : (
    <div className={cn("grid grid-cols-2 gap-2 mx-auto w-[95%] max-w-xs", className)}>
      {children}
    </div>
  );
}
