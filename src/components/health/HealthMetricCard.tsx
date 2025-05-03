
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
    <div className={cn("android-card flex flex-col elevation-2", className)}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-health-accent bg-health-accent/10 p-1.5 rounded-full">{icon}</div>}
          <h3 className="android-text-title">{title}</h3>
        </div>
        <span className={cn(statusClass[status], "text-xs px-2 py-0.5 rounded-full", {
          "bg-green-50": status === "normal",
          "bg-yellow-50": status === "warning",
          "bg-red-50": status === "alert"
        })}>
          {status === "normal" ? "Normal" : status === "warning" ? "Warning" : "Alert"}
        </span>
      </div>
      <div className="flex items-baseline mt-1">
        <span className="text-3xl font-bold">{value}</span>
        {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}
