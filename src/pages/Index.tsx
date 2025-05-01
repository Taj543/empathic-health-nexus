
import { useState } from "react";
import { Plus, MessageCircle, Search, Heart, Activity, Droplets } from "lucide-react";
import { HealthMetricCard } from "@/components/health/HealthMetricCard";
import { MedicationCard } from "@/components/health/MedicationCard";
import { ActionButton } from "@/components/health/ActionButton";
import { BottomNavigation } from "@/components/health/BottomNavigation";
import { HealthMetricGrid } from "@/components/health/HealthMetricGrid";

const Index = () => {
  const [medications, setMedications] = useState([
    { id: 1, name: "Vitamin D", dosage: "1 tablet", time: "8:00 AM", taken: false },
    { id: 2, name: "Ibuprofen", dosage: "1 tablet", time: "2:00 PM", taken: false },
  ]);

  const toggleMedication = (id: number) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
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

      {/* Medications and Activity Summary */}
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
                time={med.time}
                taken={med.taken}
                onToggle={() => toggleMedication(med.id)}
              />
            ))}
          </div>
          <button className="mt-4 w-full py-3 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-health-accent hover:bg-gray-50">
            <Plus size={16} className="mr-1" />
            Add Medication
          </button>
        </div>

        {/* Activity Summary */}
        <div className="health-card">
          <h2 className="text-lg font-semibold mb-4">Weekly Summary</h2>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Health trend visualization</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <ActionButton
            icon={<Plus size={24} />}
            label="Meds"
          />
          <ActionButton
            icon={<MessageCircle size={24} />}
            label="Chat"
          />
          <ActionButton
            icon={<Search size={24} />}
            label="Symptoms"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
