
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { BottomNavigation } from "@/components/health/BottomNavigation";

const Diagnostics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample symptom categories
  const categories = [
    { id: 1, name: "Head & Neck", icon: "🧠", count: 12 },
    { id: 2, name: "Chest & Heart", icon: "❤️", count: 8 },
    { id: 3, name: "Abdomen", icon: "🩻", count: 15 },
    { id: 4, name: "Limbs", icon: "💪", count: 10 },
    { id: 5, name: "Skin", icon: "🧬", count: 7 },
    { id: 6, name: "Mental", icon: "🧠", count: 9 },
  ];
  
  // Sample recent symptom checks
  const recentChecks = [
    { id: 1, symptom: "Headache", date: "2 days ago", result: "Tension headache" },
    { id: 2, symptom: "Sore throat", date: "1 week ago", result: "Common cold" },
  ];

  return (
    <div className="min-h-screen pb-16">
      <header className="px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-bold">Diagnostics</h1>
        <p className="text-sm text-gray-500">Check your symptoms</p>
      </header>

      <div className="px-6 py-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms..."
            className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-health-primary"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="px-6 py-2">
        <h2 className="text-lg font-semibold mb-3">Symptom Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center hover:shadow-sm transition-shadow"
            >
              <span className="text-2xl mr-3">{category.icon}</span>
              <div className="flex-1">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count} symptoms</p>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3">Recent Checks</h2>
        {recentChecks.map((check) => (
          <div
            key={check.id}
            className="bg-white rounded-xl border border-gray-200 p-4 mb-3 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{check.symptom}</h3>
              <span className="text-xs text-gray-500">{check.date}</span>
            </div>
            <p className="text-sm text-gray-700 mt-1">{check.result}</p>
            <button className="text-health-primary text-sm mt-2 flex items-center">
              View details <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        ))}
      </div>

      <div className="px-6 py-2">
        <button className="w-full bg-health-primary text-white rounded-full py-3 font-medium">
          Start New Symptom Check
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Diagnostics;
