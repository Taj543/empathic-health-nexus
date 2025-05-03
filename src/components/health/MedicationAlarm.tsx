
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
    <div className={cn("flex items-center gap-1.5 text-2xs bg-gray-50 dark:bg-gray-800 p-1 rounded-lg", className)}>
      <Clock size={10} className="text-gray-500" />
      <span className="text-gray-700 dark:text-gray-200 font-medium">{format(alarmDate, "h:mm a")}</span>
      <button
        onClick={onToggle}
        className={cn(
          "ml-auto p-1 rounded-full android-ripple",
          active 
            ? "text-health-primary bg-health-primary/10 hover:bg-health-primary/20" 
            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        )}
      >
        {active ? <Bell size={10} /> : <BellOff size={10} />}
      </button>
    </div>
  );
}
