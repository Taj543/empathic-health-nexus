
import { useState } from "react";
import { ArrowLeft, FileText, Search, AlertTriangle, Pill, Stethoscope, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Diagnostics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const diagnosticFeatures = [
    {
      id: 1,
      title: "Prescription Analyzer",
      description: "Upload and analyze prescription documents",
      icon: <FileText size={24} />,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Symptom Checker",
      description: "Check your symptoms for possible conditions",
      icon: <Search size={24} />,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      title: "Disease Detector",
      description: "AI-powered disease detection from symptoms",
      icon: <Stethoscope size={24} />,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      title: "Medicine Side Effects",
      description: "Search medicines and find side effects",
      icon: <Pill size={24} />,
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600"
    },
    {
      id: 5,
      title: "Drug Interaction Checker",
      description: "Check for dangerous drug interactions",
      icon: <AlertTriangle size={24} />,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600"
    },
    {
      id: 6,
      title: "Medical Image Analysis",
      description: "Upload medical images for AI analysis",
      icon: <Camera size={24} />,
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold">Medical Diagnostics</h1>
        </div>
        <p className="text-sm text-gray-500 ml-12">AI-powered medical analysis tools</p>
      </header>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diagnosticFeatures.map((feature) => (
              <Card key={feature.id} className={`${feature.color} hover:shadow-md transition-shadow cursor-pointer`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${feature.iconColor} bg-white`}>
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
