
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function ActionButton({
  icon,
  label,
  onClick,
  className,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-3.5 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all android-ripple material-touch w-full h-full",
        className
      )}
    >
      <div className="text-health-accent p-2 bg-health-accent/10 rounded-full mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
