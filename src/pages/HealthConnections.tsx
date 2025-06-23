
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { HealthDataSourceSelector } from "@/components/health/HealthDataSourceSelector";
import { HealthDataSource } from "@/services/healthDataService";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const HealthConnections = () => {
  const { toast } = useToast();
  const [selectedSource, setSelectedSource] = useState<HealthDataSource>('local');

  const handleSourceSelect = (sourceId: string) => {
    setSelectedSource(sourceId as HealthDataSource);
    toast({
      title: "Data source updated",
      description: `Now using ${sourceId} as your primary health data source.`,
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="px-8 pt-8 pb-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft size={24} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Health Data Connections
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Connect your health apps and devices to sync your data automatically
        </p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <HealthDataSourceSelector 
            selectedSource={selectedSource}
            onSourceSelect={handleSourceSelect}
            className="mb-8"
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Current Connection Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Active Data Source:</span>
                <span className="font-medium capitalize">{selectedSource}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Last Sync:</span>
                <span className="text-sm text-gray-500">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthConnections;
