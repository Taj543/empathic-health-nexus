
import { useState } from "react";
import { Search, BookOpen, FileText, ArrowRight } from "lucide-react";

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample knowledge categories
  const categories = [
    { id: 1, name: "Medical Encyclopedia", icon: <BookOpen size={20} />, count: 1000 },
    { id: 2, name: "Drug Interactions", icon: <FileText size={20} />, count: 500 },
    { id: 3, name: "First Aid", icon: <BookOpen size={20} />, count: 50 },
    { id: 4, name: "Preventive Care", icon: <FileText size={20} />, count: 200 },
  ];
  
  // Sample popular articles
  const popularArticles = [
    { 
      id: 1, 
      title: "Understanding Blood Pressure Readings", 
      category: "Heart Health", 
      readTime: "5 min" 
    },
    { 
      id: 2, 
      title: "Common Cold vs. Seasonal Allergies", 
      category: "Respiratory Health", 
      readTime: "4 min" 
    },
    { 
      id: 3, 
      title: "Healthy Sleep Habits", 
      category: "Wellness", 
      readTime: "7 min" 
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-bold">Knowledge</h1>
        <p className="text-sm text-gray-500">Trusted health information</p>
      </header>

      <div className="px-6 py-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medical topics..."
            className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-health-primary"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="px-6 py-2">
        <h2 className="text-lg font-semibold mb-3">Knowledge Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center hover:shadow-sm transition-shadow"
            >
              <div className="text-health-primary mr-3">{category.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count} articles</p>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3">Popular Articles</h2>
        {popularArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl border border-gray-200 p-4 mb-3 hover:shadow-sm transition-shadow"
          >
            <span className="text-xs text-health-primary font-medium">{article.category}</span>
            <h3 className="font-medium mt-1">{article.title}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{article.readTime} read</span>
              <button className="text-health-primary text-sm flex items-center">
                Read <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-2 pb-6">
        <button className="w-full border border-health-primary text-health-primary rounded-full py-3 font-medium hover:bg-health-primary/5">
          Browse All Articles
        </button>
      </div>
    </div>
  );
};

export default Knowledge;
