
import { Bell, BellOff, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MedicationAlarmProps {
  time: string;
  active: boolean;
  onToggle: () => void;
  className?: string;
}

export function MedicationAlarm({ time, active, onToggle, className }: MedicationAlarmProps) {
  // Parse the time string to get a Date object for formatting
  const [hours, minutes] = time.split(":").map(Number);
  const alarmDate = new Date();
  alarmDate.setHours(hours);
  alarmDate.setMinutes(minutes);

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <Clock size={14} className="text-gray-500" />
      <span className="text-gray-700">{format(alarmDate, "h:mm a")}</span>
      <button
        onClick={onToggle}
        className={cn(
          "p-1 rounded-full",
          active 
            ? "text-health-primary hover:bg-health-primary/10" 
            : "text-gray-400 hover:bg-gray-100"
        )}
      >
        {active ? <Bell size={14} /> : <BellOff size={14} />}
      </button>
    </div>
  );
}
