
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bell } from "lucide-react";
import { useNotificationPermission } from "@/hooks/useNotificationPermission";

interface NotificationPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationPermissionDialog({
  open,
  onOpenChange,
}: NotificationPermissionDialogProps) {
  const { permission, requestPermission, supported } = useNotificationPermission();

  const handleEnableNotifications = () => {
    requestPermission();
    onOpenChange(false);
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Bell size={28} className="text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Enable Notifications</DialogTitle>
          <DialogDescription className="text-center pt-2">
            {supported 
              ? "Allow medication reminders to help you stay on track with your health regimen."
              : "Your browser doesn't support notifications. Updates will only be visible within the app."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
          >
            Not Now
          </Button>
          <Button
            type="button"
            onClick={handleEnableNotifications}
            disabled={!supported || permission === "granted"}
          >
            {permission === "granted" ? "Notifications Enabled" : "Enable Notifications"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
