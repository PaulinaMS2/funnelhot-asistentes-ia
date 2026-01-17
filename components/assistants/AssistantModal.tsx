"use client";

import { useAssistantsStore } from "@/store/assistants.store";
import { AssistantForm } from "./AssistantForm";   

export function AssistantModal() {
  const { isModalOpen, closeModal } = useAssistantsStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <AssistantForm />
      </div>
    </div>
  );
}
