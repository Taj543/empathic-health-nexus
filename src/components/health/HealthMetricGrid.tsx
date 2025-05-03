
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
    <div className={cn("w-full overflow-x-auto android-scroll scrollbar-none pb-2 -mx-2 px-2", className)}>
      <div className="grid grid-flow-col auto-cols-[250px] md:auto-cols-[270px] gap-3 w-max">
        {children}
      </div>
    </div>
  ) : (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {children}
    </div>
  );
}
