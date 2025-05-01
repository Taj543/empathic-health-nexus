import { useState } from "react";
import { Plus, MessageCircle, Search, Heart, Activity, Bell } from "lucide-react";
import { HealthMetricCard } from "@/components/health/HealthMetricCard";
import { MedicationCard } from "@/components/health/MedicationCard";
import { ActionButton } from "@/components/health/ActionButton";
import { BottomNavigation } from "@/components/health/BottomNavigation";
import { HealthMetricGrid } from "@/components/health/HealthMetricGrid";
import { MedicationAlarmDialog } from "@/components/health/MedicationAlarmDialog";
import { WeeklySummaryTabs } from "@/components/health/WeeklySummaryTabs";
import { useToast } from "@/hooks/use-toast";

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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

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
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Demo User</h1>
        <p className="text-gray-600">Here's your health overview</p>
      </header>

      {/* Health Metrics Categories */}
      <div className="px-6">
        <h2 className="text-xl font-semibold mb-3">Core Health Vitals</h2>
        <HealthMetricGrid>
          <HealthMetricCard
            title="Heart Rate"
            value={72}
            unit="bpm"
            status="normal"
            icon={<Heart size={20} />}
          />
          <HealthMetricCard
            title="Blood Pressure"
            value="120/80"
            unit="mmHg"
            status="normal"
          />
          <HealthMetricCard
            title="SpO₂"
            value={98}
            unit="%"
            status="normal"
          />
          <HealthMetricCard
            title="Respiratory Rate"
            value={16}
            unit="bpm"
            status="normal"
          />
        </HealthMetricGrid>
      </div>

      <div className="px-6 mt-6">
        <h2 className="text-xl font-semibold mb-3">Activity</h2>
        <HealthMetricGrid>
          <HealthMetricCard
            title="Steps"
            value="8,432"
            status="normal"
            icon={<Activity size={20} />}
          />
          <HealthMetricCard
            title="Calories"
            value={1250}
            unit="kcal"
            status="normal"
          />
        </HealthMetricGrid>
      </div>

      {/* Medications and Weekly Summary */}
      <div className="px-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medications */}
        <div className="health-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Today's Medications</h2>
            <button className="text-health-accent text-sm">See All</button>
          </div>
          <div className="divide-y divide-gray-100">
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
            className="mt-4 w-full py-3 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-health-accent hover:bg-gray-50"
          >
            <Plus size={16} className="mr-1" />
            Add Medication
          </button>
        </div>

        {/* Weekly Summary */}
        <div className="health-card">
          <WeeklySummaryTabs />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
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
