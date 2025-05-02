
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
    <div className={cn("space-y-2", className)}>
      <h3 className="text-sm font-medium">Data Sources</h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {connections.map((connection) => (
          <button
            key={connection.id}
            onClick={() => handleConnect(connection)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200",
              "hover:border-gray-300 transition-colors",
              selectedSource === connection.id && "border-health-accent bg-gray-50",
              connecting === connection.id && "opacity-70"
            )}
            disabled={connecting !== null}
          >
            <div className="relative mb-2">
              {connection.connected && selectedSource === connection.id && (
                <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                  <Check size={10} className="text-white" />
                </span>
              )}
              <Link size={20} className={cn(
                connection.connected ? "text-health-accent" : "text-gray-400"
              )} />
            </div>
            <span className="text-xs font-medium">{connection.name}</span>
            {!connection.connected && (
              <span className="text-[10px] text-gray-400">
                {connecting === connection.id ? "Connecting..." : "Not connected"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
