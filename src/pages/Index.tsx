
import { useState, useEffect } from "react";
import { Plus, Search, Heart, Activity, BookOpen, User, MessageCircle, Bell } from "lucide-react";
import { HealthMetricCard } from "@/components/health/HealthMetricCard";
import { MedicationCard } from "@/components/health/MedicationCard";
import { ActionButton } from "@/components/health/ActionButton";
import { HealthMetricGrid } from "@/components/health/HealthMetricGrid";
import { MedicationAlarmDialog } from "@/components/health/MedicationAlarmDialog";
import { WeeklySummaryTabs } from "@/components/health/WeeklySummaryTabs";
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
      <header className="px-4 pt-5 pb-3 bg-white dark:bg-gray-900 elevation-1 z-10">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Welcome back, {user?.name || "User"}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Here's your health overview
          {dataSource !== 'local' && (
            <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              Connected to {dataSource}
            </span>
          )}
        </p>
      </header>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 overflow-y-auto overscroll-behavior-y-contain android-scroll">
        <div className="px-4 pt-3 pb-24 max-w-md mx-auto">
          {/* Health Metrics Categories */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Core Health Vitals</h2>
            <HealthMetricGrid>
              <HealthMetricCard
                title="Heart Rate"
                value={healthMetrics.heartRate}
                unit="bpm"
                status="normal"
                icon={<Heart size={18} />}
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
                title="Respiratory Rate"
                value={healthMetrics.respiratoryRate}
                unit="bpm"
                status="normal"
              />
            </HealthMetricGrid>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Activity</h2>
            <HealthMetricGrid>
              <HealthMetricCard
                title="Steps"
                value={healthMetrics.steps.toLocaleString()}
                status="normal"
                icon={<Activity size={18} />}
              />
              <HealthMetricCard
                title="Calories"
                value={healthMetrics.calories}
                unit="kcal"
                status="normal"
              />
            </HealthMetricGrid>
          </div>

          {/* Medications and Weekly Summary */}
          <div className="space-y-4">
            {/* Medications */}
            <div className="material-card">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Today's Medications</h2>
                <button className="text-health-accent text-xs android-ripple px-2 py-1 rounded-full">See All</button>
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
                className="mt-3 w-full py-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex items-center justify-center text-health-accent hover:bg-gray-50 dark:hover:bg-gray-800 android-ripple"
              >
                <Plus size={16} className="mr-1.5" />
                <span className="text-sm">Add Medication</span>
              </button>
            </div>

            {/* Weekly Summary */}
            <div className="material-card">
              <WeeklySummaryTabs onDataSourceChange={handleDataSourceChange} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-4 mx-auto">
              <Link to="/emotional" className="h-full">
                <ActionButton
                  icon={<Heart size={24} />}
                  label="Emotional"
                />
              </Link>
              <Link to="/diagnostics" className="h-full">
                <ActionButton
                  icon={<Activity size={24} />}
                  label="Diagnostics"
                />
              </Link>
              <Link to="/knowledge" className="h-full">
                <ActionButton
                  icon={<BookOpen size={24} />}
                  label="Knowledge"
                />
              </Link>
              <Link to="/profile" className="h-full">
                <ActionButton
                  icon={<User size={24} />}
                  label="Profile"
                />
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Add Floating Action Button (FAB) for VaidyaMind medical bot */}
      <Link to="/medical-ai">
        <button className="fab">
          <MessageCircle size={28} />
        </button>
      </Link>

      {/* Medication Alarm Dialog */}
      <MedicationAlarmDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        medication={selectedMedication}
        onSave={handleSaveMedication}
      />
      
      {/* Notification Permission Dialog */}
      <NotificationPermissionDialog
        open={showPermissionDialog}
        onOpenChange={setShowPermissionDialog}
      />
    </div>
  );
};

export default Index;
