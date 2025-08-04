import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
interface NotificationHook {
  contextHolder: React.ReactElement;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}

export const useToast = (): NotificationHook => {
  const [api, contextHolder] = notification.useNotification({
    placement: "bottomRight",
  });

  const showNotification = (type: NotificationType, message: string) => {
    api[type]({
      message,
      placement: "bottomRight",
    });
  };

  return {
    contextHolder,
    showSuccess: (message) => showNotification("success", message),
    showError: (message) => showNotification("error", message),
    showInfo: (message) => showNotification("info", message),
    showWarning: (message) => showNotification("warning", message),
  };
};
