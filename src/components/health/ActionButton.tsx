
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
        "flex flex-col items-center justify-center p-8 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all w-full",
        className
      )}
    >
      <div className="text-health-accent mb-4 text-4xl">
        {icon}
      </div>
      <span className="text-lg font-medium text-gray-800">{label}</span>
    </button>
  );
}
