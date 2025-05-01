
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MedicationCardProps {
  name: string;
  dosage: string;
  time: string;
  taken?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function MedicationCard({
  name,
  dosage,
  time,
  taken = false,
  onToggle,
  className,
}: MedicationCardProps) {
  return (
    <div className={cn("flex items-center justify-between py-3", className)}>
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
          <p className="text-sm text-gray-500">{dosage} - {time}</p>
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
  );
}
