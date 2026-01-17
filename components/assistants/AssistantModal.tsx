"use client";

import { useAssistantsStore } from "@/store/assistants.store";
import { AssistantForm } from "./AssistantForm";

export function AssistantModal() {
  const { isModalOpen, closeModal } = useAssistantsStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <AssistantForm />
      </div>
    </div>
  );
}

