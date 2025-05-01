
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MedicationAlarm } from "./MedicationAlarm";

interface MedicationCardProps {
  name: string;
  dosage: string;
  time?: string;
  taken?: boolean;
  onToggle?: () => void;
  className?: string;
  alarms?: { id: number; time: string; active: boolean }[];
  onToggleAlarm?: (id: number) => void;
  onAddAlarm?: () => void;
  onEditMedication?: () => void;
}

export function MedicationCard({
  name,
  dosage,
  time,
  taken = false,
  onToggle,
  className,
  alarms = [],
  onToggleAlarm,
  onAddAlarm,
  onEditMedication,
}: MedicationCardProps) {
  return (
    <div className={cn("flex flex-col py-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-health-accent/20 text-health-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 6 4-4 4 4" />
              <path d="M16 2v6h6" />
              <path d="M8 2H2v22h20V10" />
              <path d="M12 18v-6" />
              <path d="M9 15h6" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{dosage}{time ? ` - ${time}` : ""}</p>
          </div>
        </div>
        <button 
          onClick={onToggle}
          className={cn(
            "w-6 h-6 flex items-center justify-center rounded-md border",
            taken 
              ? "bg-health-primary border-health-primary text-white" 
              : "bg-white border-gray-300"
          )}
        >
          {taken && <Check size={14} />}
        </button>
      </div>
      
      {/* Alarms section */}
      {alarms.length > 0 && (
        <div className="mt-2 ml-13 pl-[52px]">
          <div className="space-y-1">
            {alarms.map((alarm) => (
              <MedicationAlarm
                key={alarm.id}
                time={alarm.time}
                active={alarm.active}
                onToggle={() => onToggleAlarm && onToggleAlarm(alarm.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="mt-2 ml-13 pl-[52px] flex space-x-4">
        <button 
          onClick={onAddAlarm}
          className="text-xs text-health-accent flex items-center gap-1 hover:underline"
        >
          <Clock size={12} />
          {alarms.length ? "Add another alarm" : "Set alarm"}
        </button>
        <button 
          onClick={onEditMedication}
          className="text-xs text-gray-500 hover:underline"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
