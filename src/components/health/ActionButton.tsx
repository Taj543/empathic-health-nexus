
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
        "flex flex-col items-center justify-center p-6 rounded-3xl border bg-card shadow-md hover:shadow-lg transition-all android-ripple material-touch w-full h-full",
        className
      )}
    >
      <div className="text-health-accent p-4 bg-health-accent/10 rounded-full mb-5 text-3xl">
        {icon}
      </div>
      <span className="text-xl font-medium">{label}</span>
    </button>
  );
}
