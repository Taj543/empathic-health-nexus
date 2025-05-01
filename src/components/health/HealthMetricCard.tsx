
import { cn } from "@/lib/utils";

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: "normal" | "warning" | "alert";
  className?: string;
}

export function HealthMetricCard({
  title,
  value,
  unit,
  status = "normal",
  className,
}: HealthMetricCardProps) {
  const statusClass = {
    normal: "status-normal",
    warning: "status-warning",
    alert: "status-alert",
  };

  return (
    <div className={cn("health-card flex flex-col", className)}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <span className={statusClass[status]}>{status === "normal" ? "Normal" : status === "warning" ? "Warning" : "Alert"}</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold">{value}</span>
        {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}
