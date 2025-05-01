
import React from 'react';
import { cn } from "@/lib/utils";

interface HealthMetricGridProps {
  children: React.ReactNode;
  className?: string;
}

export function HealthMetricGrid({ children, className }: HealthMetricGridProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-3", className)}>
      {children}
    </div>
  );
}
