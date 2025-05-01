
import { useState } from "react";
import { Clock } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  time?: string;
  taken: boolean;
  alarms: { id: number; time: string; active: boolean }[];
}

interface MedicationAlarmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medication: Medication | null;
  onSave: (medicationId: number, updatedMedication: Partial<Medication>) => void;
}

export function MedicationAlarmDialog({ 
  open, 
  onOpenChange,
  medication,
  onSave
}: MedicationAlarmDialogProps) {
  const { toast } = useToast();
  const [name, setName] = useState(medication?.name || "");
  const [dosage, setDosage] = useState(medication?.dosage || "");
  const [alarms, setAlarms] = useState<{ id: number; time: string; active: boolean }[]>(
    medication?.alarms || []
  );
  
  // Time options for the dropdown
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  
  const handleAddAlarm = () => {
    const newAlarmId = alarms.length > 0 ? Math.max(...alarms.map(a => a.id)) + 1 : 1;
    setAlarms([...alarms, { id: newAlarmId, time: "08:00", active: true }]);
  };
  
  const handleRemoveAlarm = (id: number) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };
  
  const handleAlarmTimeChange = (id: number, time: string) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, time } : alarm
    ));
  };
  
  const handleSubmit = () => {
    if (!medication) return;
    
    onSave(medication.id, {
      name,
      dosage,
      alarms
    });
    
    toast({
      title: "Medication updated",
      description: `Alarms have been set for ${name}`,
    });
    
    onOpenChange(false);
  };
  
  if (!medication) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Medication Alarm</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="medication-name">Medication Name</Label>
            <Input
              id="medication-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter medication name"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="medication-dosage">Dosage</Label>
            <Input
              id="medication-dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Enter dosage"
            />
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Alarms</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddAlarm}
              >
                Add Alarm
              </Button>
            </div>
            
            {alarms.length === 0 ? (
              <p className="text-sm text-gray-500">No alarms set. Add an alarm to get reminded.</p>
            ) : (
              <div className="space-y-2">
                {alarms.map((alarm) => (
                  <div key={alarm.id} className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <Select
                      value={alarm.time}
                      onValueChange={(value) => handleAlarmTimeChange(alarm.id, value)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAlarm(alarm.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
