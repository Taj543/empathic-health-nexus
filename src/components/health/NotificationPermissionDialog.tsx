
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
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-none shadow-lg">
        <DialogHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <Bell size={32} className="text-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-medium mb-2">Enable Notifications</DialogTitle>
          <DialogDescription className="text-center text-base">
            {supported 
              ? "Allow medication reminders to help you stay on track with your health regimen."
              : "Your browser doesn't support notifications. Updates will only be visible within the app."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            className="h-12 text-base font-medium rounded-xl"
          >
            Not Now
          </Button>
          <Button
            type="button"
            onClick={handleEnableNotifications}
            disabled={!supported || permission === "granted"}
            className="h-12 text-base font-medium rounded-xl"
          >
            {permission === "granted" ? "Notifications Enabled" : "Enable Notifications"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
