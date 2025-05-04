
import React from 'react';
import { Check, Link, Settings } from 'lucide-react';
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

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-base font-medium mb-1.5">Data Sources</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {connections.map((connection) => (
          <button
            key={connection.id}
            onClick={() => handleConnect(connection)}
            className={cn(
              "flex flex-col items-center justify-center p-3.5 rounded-2xl border bg-card shadow-sm h-full w-full",
              "hover:shadow-md transition-all android-ripple",
              selectedSource === connection.id ? "border-health-accent bg-health-accent/10" : "border-gray-200",
              connecting === connection.id && "opacity-70"
            )}
            disabled={connecting !== null}
          >
            <div className="relative p-2.5 mb-2.5 bg-gray-50 dark:bg-gray-800 rounded-full">
              {connection.connected && selectedSource === connection.id && (
                <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                  <Check size={12} className="text-white" />
                </span>
              )}
              <Link size={22} className={cn(
                connection.connected ? "text-health-accent" : "text-gray-400"
              )} />
            </div>
            <span className="text-sm font-medium">{connection.name}</span>
            {!connection.connected && (
              <span className="text-xs text-gray-400 mt-1">
                {connecting === connection.id ? "Connecting..." : "Not connected"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
