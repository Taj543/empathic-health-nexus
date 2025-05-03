
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export type NotificationPermissionState = "granted" | "denied" | "default" | "unsupported";

export function useNotificationPermission() {
  const { toast } = useToast();
  const [permission, setPermission] = useState<NotificationPermissionState>(
    typeof Notification === "undefined" ? "unsupported" : Notification.permission as NotificationPermissionState
  );

  // Check if the browser supports notifications
  const supported = typeof Notification !== "undefined";

  // Function to request permission
  const requestPermission = async () => {
    if (!supported) {
      toast({
        title: "Notifications not supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result as NotificationPermissionState);
      
      if (result === "granted") {
        toast({
          title: "Notifications enabled",
          description: "You will now receive medication reminders.",
        });
      } else {
        toast({
          title: "Notifications disabled",
          description: "You won't receive medication reminders.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast({
        title: "Permission request failed",
        description: "There was a problem requesting notification permissions.",
        variant: "destructive",
      });
    }
  };

  // Schedule a notification
  const scheduleNotification = (title: string, options?: NotificationOptions) => {
    if (permission === "granted") {
      try {
        new Notification(title, options);
        return true;
      } catch (error) {
        console.error("Error showing notification:", error);
        return false;
      }
    }
    return false;
  };

  // Check permission on mount
  useEffect(() => {
    if (supported && Notification.permission !== permission) {
      setPermission(Notification.permission as NotificationPermissionState);
    }
  }, [supported]);

  return {
    permission,
    supported,
    requestPermission,
    scheduleNotification,
  };
}
