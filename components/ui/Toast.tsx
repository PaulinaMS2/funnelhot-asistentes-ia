"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
}

export function Toast({
  message,
  type = "error",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-lg px-4 py-3 text-sm shadow-lg transition-all
        ${
          type === "error"
            ? "bg-red-600 text-white"
            : "bg-teal-600 text-white"
        }`}
    >
      {message}
    </div>
  );
}
