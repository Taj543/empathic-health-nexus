
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, Heart, Activity, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={22} />, label: "Home", path: "/" },
    { icon: <MessageCircle size={22} />, label: "Medical AI", path: "/medical-ai" },
    { icon: <Heart size={22} />, label: "Emotional", path: "/emotional" },
    { icon: <Activity size={22} />, label: "Diagnostics", path: "/diagnostics" },
    { icon: <BookOpen size={22} />, label: "Knowledge", path: "/knowledge" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 elevation-3 z-20">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-2 w-full h-full android-ripple transition-colors",
            location.pathname === item.path
              ? "text-health-primary"
              : "text-gray-500"
          )}
        >
          <div className={cn(
            "mb-1",
            location.pathname === item.path && "animate-pulse-slow"
          )}>{item.icon}</div>
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
