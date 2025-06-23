
import React from 'react';
import { Check, Link, Settings, Smartphone, Watch, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { availableConnections, connectToHealthSource, HealthDataConnection } from '@/services/healthDataService';
import { useToast } from '@/hooks/use-toast';

interface HealthDataSourceSelectorProps {
  onSourceSelect: (sourceId: string) => void;
  selectedSource: string;
  className?: string;
}

export function HealthDataSourceSelector({ 
  onSourceSelect, 
  selectedSource, 
  className 
}: HealthDataSourceSelectorProps) {
  const { toast } = useToast();
  const [connections, setConnections] = React.useState<HealthDataConnection[]>(availableConnections);
  const [connecting, setConnecting] = React.useState<string | null>(null);

  const handleConnect = async (connection: HealthDataConnection) => {
    if (connection.connected) {
      onSourceSelect(connection.id);
      return;
    }
    
    setConnecting(connection.id);
    
    try {
      const success = await connectToHealthSource(connection.id);
      
      if (success) {
        setConnections(connections.map(c => 
          c.id === connection.id ? { ...c, connected: true } : c
        ));
        
        onSourceSelect(connection.id);
        
        toast({
          title: "Connected successfully",
          description: `Connected to ${connection.name}`,
        });
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${connection.name}`,
        variant: "destructive",
      });
    } finally {
      setConnecting(null);
    }
  };

  const getConnectionIcon = (connectionId: string) => {
    switch (connectionId) {
      case 'google-fit':
        return <Smartphone size={24} className="text-blue-500" />;
      case 'samsung':
        return <Watch size={24} className="text-blue-600" />;
      case 'fitbit':
        return <Activity size={24} className="text-green-500" />;
      default:
        return <Settings size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold mb-4">Connect Health Data Sources</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {connections.map((connection) => (
          <button
            key={connection.id}
            onClick={() => handleConnect(connection)}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-2xl border bg-card shadow-sm h-full w-full",
              "hover:shadow-md transition-all android-ripple",
              selectedSource === connection.id ? "border-health-accent bg-health-accent/10" : "border-gray-200",
              connecting === connection.id && "opacity-70"
            )}
            disabled={connecting !== null}
          >
            <div className="relative p-4 mb-3 bg-gray-50 dark:bg-gray-800 rounded-full">
              {connection.connected && selectedSource === connection.id && (
                <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                  <Check size={12} className="text-white" />
                </span>
              )}
              {getConnectionIcon(connection.id)}
            </div>
            <span className="text-sm font-medium text-center">{connection.name}</span>
            {!connection.connected && (
              <span className="text-xs text-gray-400 mt-1">
                {connecting === connection.id ? "Connecting..." : "Tap to connect"}
              </span>
            )}
            {connection.connected && (
              <span className="text-xs text-green-500 mt-1">Connected</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
