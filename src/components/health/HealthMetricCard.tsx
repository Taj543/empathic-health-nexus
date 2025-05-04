
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
    normal: "text-green-500",
    warning: "text-yellow-500",
    alert: "text-red-500",
  };

  return (
    <div className={cn("rounded-xl border bg-white p-8 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium text-gray-800">{title}</h3>
        {status && (
          <span className={cn(statusClass[status], "text-sm font-medium")}>
            {status === "normal" ? "Normal" : status === "warning" ? "Warning" : "Alert"}
          </span>
        )}
      </div>
      <div className="flex items-baseline">
        <span className="text-5xl font-bold text-gray-900">{value}</span>
        {unit && <span className="ml-2 text-xl text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}
