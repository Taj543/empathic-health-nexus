
import { useState, useEffect } from "react";
import { Plus, MessageCircle, Search, Heart, Activity, Bell } from "lucide-react";
import { HealthMetricCard } from "@/components/health/HealthMetricCard";
import { MedicationCard } from "@/components/health/MedicationCard";
import { ActionButton } from "@/components/health/ActionButton";
import { BottomNavigation } from "@/components/health/BottomNavigation";
import { HealthMetricGrid } from "@/components/health/HealthMetricGrid";
import { MedicationAlarmDialog } from "@/components/health/MedicationAlarmDialog";
import { WeeklySummaryTabs } from "@/components/health/WeeklySummaryTabs";
import { useToast } from "@/hooks/use-toast";
import { HealthDataSource, fetchHealthSummaryData } from "@/services/healthDataService";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <header className="px-6 pt-8 pb-4 bg-white dark:bg-gray-900 elevation-1 z-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back, Demo User</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your health overview
          {dataSource !== 'local' && (
            <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              Connected to {dataSource}
            </span>
          )}
        </p>
      </header>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 overflow-y-auto overscroll-behavior-y-contain">
        <div className="px-6 pt-4 pb-24">
          {/* Health Metrics Categories */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Core Health Vitals</h2>
            <HealthMetricGrid scrollable={true}>
              <HealthMetricCard
                title="Heart Rate"
                value={healthMetrics.heartRate}
                unit="bpm"
                status="normal"
                icon={<Heart size={20} />}
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

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Activity</h2>
            <HealthMetricGrid>
              <HealthMetricCard
                title="Steps"
                value={healthMetrics.steps.toLocaleString()}
                status="normal"
                icon={<Activity size={20} />}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Medications */}
            <div className="material-card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Today's Medications</h2>
                <button className="text-health-accent text-sm android-ripple px-2 py-1 rounded-full">See All</button>
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
                className="mt-4 w-full py-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center text-health-accent hover:bg-gray-50 dark:hover:bg-gray-800 android-ripple"
              >
                <Plus size={16} className="mr-1" />
                Add Medication
              </button>
            </div>

            {/* Weekly Summary */}
            <div className="material-card">
              <WeeklySummaryTabs onDataSourceChange={handleDataSourceChange} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-3">
              <ActionButton
                icon={<Plus size={24} />}
                label="Meds"
                onClick={handleAddMedication}
              />
              <ActionButton
                icon={<Bell size={24} />}
                label="Alarms"
              />
              <ActionButton
                icon={<MessageCircle size={24} />}
                label="Chat"
              />
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Add Floating Action Button (FAB) */}
      <button className="fab">
        <Plus size={24} />
      </button>

      {/* Medication Alarm Dialog */}
      <MedicationAlarmDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        medication={selectedMedication}
        onSave={handleSaveMedication}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
