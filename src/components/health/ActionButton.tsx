
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
        "flex flex-col items-center justify-center p-1.5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all android-ripple material-touch",
        className
      )}
    >
      <div className="text-health-accent p-1 bg-health-accent/10 rounded-full text-[16px]">{icon}</div>
      <span className="text-2xs font-medium mt-0.5">{label}</span>
    </button>
  );
}
