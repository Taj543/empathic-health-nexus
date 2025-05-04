
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
    <div className={cn("android-card flex flex-col elevation-2 py-6 px-6", className)}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-health-accent bg-health-accent/10 p-3 rounded-full text-2xl">{icon}</div>}
          <h3 className="text-xl font-medium">{title}</h3>
        </div>
        <span className={cn(statusClass[status], "text-sm px-3 py-1 rounded-full", {
          "bg-green-50": status === "normal",
          "bg-yellow-50": status === "warning",
          "bg-red-50": status === "alert"
        })}>
          {status === "normal" ? "Normal" : status === "warning" ? "Warning" : "Alert"}
        </span>
      </div>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold">{value}</span>
        {unit && <span className="ml-2 text-lg text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}
