
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Activity, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <Heart size={20} />, label: "SnehiAi", path: "/emotional" },
    { icon: <Activity size={20} />, label: "Diagnostics", path: "/diagnostics" },
    { icon: <BookOpen size={20} />, label: "Knowledge", path: "/knowledge" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-14 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 elevation-3 z-20">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-1 w-full h-full android-ripple transition-colors",
            location.pathname === item.path
              ? "text-health-primary"
              : "text-gray-500"
          )}
        >
          <div className={cn(
            "mb-0.5",
            location.pathname === item.path && "animate-pulse-slow"
          )}>{item.icon}</div>
          <span className="text-2xs font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
