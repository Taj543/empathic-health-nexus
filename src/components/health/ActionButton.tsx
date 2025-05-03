
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
        "flex flex-col items-center justify-center p-4 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all android-ripple material-touch",
        className
      )}
    >
      <div className="text-health-accent mb-2 p-2 bg-health-accent/10 rounded-full">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
