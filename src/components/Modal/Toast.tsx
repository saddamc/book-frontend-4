import { AlertCircle, CheckCircle, X, XCircle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  type,
  message,
  onClose,
  duration = 5000,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
  };

  const bgColors = {
    success: "bg-emerald-50 border-emerald-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center space-x-3 p-4 rounded-lg border shadow-lg ${bgColors[type]} animate-slide-in`}
    >
      {icons[type]}
      <span className="text-sm font-medium text-gray-900">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
