
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
    <ScrollArea className={cn("w-full pr-2", className)}>
      <div className="grid grid-cols-2 gap-3 w-full pb-2">
        {children}
      </div>
    </ScrollArea>
  ) : (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {children}
    </div>
  );
}
