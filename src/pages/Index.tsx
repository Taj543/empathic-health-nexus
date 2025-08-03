import { useState, useEffect } from "react";
import { Plus, Search, Heart, Activity, BookOpen, User, MessageCircle, Bell, Home, BarChart2, Bot } from "lucide-react";
import { HealthMetricCard } from "@/components/health/HealthMetricCard";
import { MedicationCard } from "@/components/health/MedicationCard";
import { ActionButton } from "@/components/health/ActionButton";
import { HealthMetricGrid } from "@/components/health/HealthMetricGrid";
import { WeeklySummaryTabs } from "@/components/health/WeeklySummaryTabs";
import { MedicationAlarmDialog } from "@/components/health/MedicationAlarmDialog";
import { NotificationPermissionDialog } from "@/components/health/NotificationPermissionDialog";
import { useToast } from "@/hooks/use-toast";
import { useNotificationPermission } from "@/hooks/useNotificationPermission";
import { useAuth } from "@/hooks/useAuth";
import { HealthDataSource, fetchHealthSummaryData } from "@/services/healthDataService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  time?: string;
  taken: boolean;
  alarms: { id: number; time: string; active: boolean }[];
}

const Index = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { permission } = useNotificationPermission();
  
  const [medications, setMedications] = useState<Medication[]>([
    { 
      id: 1, 
      name: "Vitamin D", 
      dosage: "1 tablet", 
      taken: false,
      alarms: [{ id: 1, time: "08:00", active: true }]
    },
    { 
      id: 2, 
      name: "Ibuprofen", 
      dosage: "1 tablet", 
      taken: false,
      alarms: []
    },
  ]);
  
  // Add state for selected data source and health metrics
  const [dataSource, setDataSource] = useState<HealthDataSource>('local');
  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: 72,
    bloodPressure: "120/80",
    spO2: 98,
    respiratoryRate: 16,
    steps: 8432,
    calories: 1250
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  // Check if we should prompt for notification permissions
  useEffect(() => {
    // Only show the permission dialog if it hasn't been decided yet
    if (permission === "default" && medications.some(med => med.alarms.length > 0)) {
      // Wait a moment before showing the dialog for better UX
      const timer = setTimeout(() => {
        setShowPermissionDialog(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [permission, medications]);

  // Fetch health summary data when data source changes
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setIsLoading(true);
        const summaryData = await fetchHealthSummaryData(dataSource);
        setHealthMetrics({
          heartRate: summaryData.heartRate,
          bloodPressure: summaryData.bloodPressure,
          spO2: summaryData.spO2,
          respiratoryRate: summaryData.respiratoryRate,
          steps: summaryData.steps,
          calories: summaryData.calories
        });
      } catch (error) {
        console.error("Error fetching health summary data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSummaryData();
  }, [dataSource]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  // Handle data source change from WeeklySummaryTabs
  const handleDataSourceChange = (source: HealthDataSource) => {
    setDataSource(source);
  };

  const toggleMedication = (id: number) => {
    setMedications(
      medications.map((med) => {
        if (med.id === id) {
          const newTaken = !med.taken;
          // Show toast when medication is marked as taken
          if (newTaken) {
            toast({
              title: "Medication taken",
              description: `You've marked ${med.name} as taken.`,
            });
          }
          return { ...med, taken: newTaken };
        }
        return med;
      })
    );
  };

  const toggleMedicationAlarm = (medicationId: number, alarmId: number) => {
    setMedications(
      medications.map((med) => {
        if (med.id === medicationId) {
          const updatedAlarms = med.alarms.map((alarm) => 
            alarm.id === alarmId ? { ...alarm, active: !alarm.active } : alarm
          );
          return { ...med, alarms: updatedAlarms };
        }
        return med;
      })
    );
  };
  
  const handleAddMedication = () => {
    const newId = medications.length > 0 ? Math.max(...medications.map(m => m.id)) + 1 : 1;
    const newMedication: Medication = {
      id: newId,
      name: "New Medication",
      dosage: "1 tablet",
      taken: false,
      alarms: []
    };
    
    setSelectedMedication(newMedication);
    setMedications([...medications, newMedication]);
    setDialogOpen(true);
  };
  
  const handleEditMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setDialogOpen(true);
  };
  
  const handleAddAlarm = (medicationId: number) => {
    // If notification permission is not granted, show the dialog
    if (permission !== "granted") {
      setShowPermissionDialog(true);
    }
    
    const medication = medications.find(m => m.id === medicationId);
    if (medication) {
      setSelectedMedication(medication);
      setDialogOpen(true);
    }
  };
  
  const handleSaveMedication = (medicationId: number, updatedMedication: Partial<Medication>) => {
    setMedications(
      medications.map((med) => {
        if (med.id === medicationId) {
          return { ...med, ...updatedMedication };
        }
        return med;
      })
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="px-8 pt-8 pb-4 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome back, {user?.name || "User"}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Here's your health overview
          {dataSource !== 'local' && (
            <span className="ml-2 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              Connected to {dataSource}
            </span>
          )}
        </p>
      </header>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 overflow-y-auto overscroll-behavior-y-contain">
        <div className="px-8 pt-6 pb-32 max-w-5xl mx-auto">
          {/* Health Metrics - Now includes all 4 metrics */}
          <div className="mb-8">
            <HealthMetricGrid>
              <HealthMetricCard
                title="Heart Rate"
                value={healthMetrics.heartRate}
                unit="bpm"
                status="normal"
              />
              <HealthMetricCard
                title="Blood Pressure"
                value={healthMetrics.bloodPressure}
                unit="mmHg"
                status="normal"
              />
              <HealthMetricCard
                title="SpO₂"
                value={healthMetrics.spO2}
                unit="%"
                status="normal"
              />
              <HealthMetricCard
                title="Calories"
                value={healthMetrics.calories}
                unit="kcal"
                status="normal"
              />
            </HealthMetricGrid>
          </div>

          {/* Weekly Summary Section with Charts */}
          <div className="mb-8">
            <WeeklySummaryTabs onDataSourceChange={handleDataSourceChange} />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Medications Section */}
            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Today's Medications</h2>
                <button className="text-health-accent text-sm">See All</button>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {medications.map((med) => (
                  <MedicationCard
                    key={med.id}
                    name={med.name}
                    dosage={med.dosage}
                    taken={med.taken}
                    onToggle={() => toggleMedication(med.id)}
                    alarms={med.alarms}
                    onToggleAlarm={(alarmId) => toggleMedicationAlarm(med.id, alarmId)}
                    onAddAlarm={() => handleAddAlarm(med.id)}
                    onEditMedication={() => handleEditMedication(med)}
                  />
                ))}
              </div>
              <button 
                onClick={handleAddMedication}
                className="mt-6 w-full py-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center text-health-accent hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Plus size={20} className="mr-2" />
                <span className="text-lg">Add Medication</span>
              </button>
            </div>
          </div>

        </div>
      </ScrollArea>

      {/* Dialogs - keep existing code unchanged */}
      <MedicationAlarmDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        medication={selectedMedication}
        onSave={handleSaveMedication}
      />
      
      <NotificationPermissionDialog
        open={showPermissionDialog}
        onOpenChange={setShowPermissionDialog}
      />
    </div>
  );
};

export default Index;
