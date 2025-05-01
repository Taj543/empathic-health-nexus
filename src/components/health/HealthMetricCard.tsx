
import { cn } from "@/lib/utils";

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: "normal" | "warning" | "alert";
  className?: string;
  icon?: React.ReactNode;
}

export function HealthMetricCard({
  title,
  value,
  unit,
  status = "normal",
  className,
  icon,
}: HealthMetricCardProps) {
  const statusClass = {
    normal: "status-normal",
    warning: "status-warning",
    alert: "status-alert",
  };

  return (
    <div className={cn("health-card flex flex-col", className)}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          {icon && <div className="text-health-accent">{icon}</div>}
          <h3 className="text-base font-medium text-gray-700">{title}</h3>
        </div>
        <span className={statusClass[status]}>{status === "normal" ? "Normal" : status === "warning" ? "Warning" : "Alert"}</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}</span>
        {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}
