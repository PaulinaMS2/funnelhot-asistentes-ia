"use client";

import { Assistant } from "@/types/assistant";

interface Props {
  assistant: Assistant;
  onEdit: () => void;
  onDelete: () => void;
  onTrain: () => void;
}

export function AssistantCard({
  assistant,
  onEdit,
  onDelete,
  onTrain,
}: Props) {
  return (
    <div className="border rounded-lg p-4 space-y-2 hover:shadow-sm transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {assistant.name}
          </h3>
          <p className="text-sm text-gray-500">
            {assistant.language} · {assistant.tone}
          </p>
        </div>

        <div className="flex gap-2 text-sm">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={onTrain}
            className="text-green-600 hover:underline"
          >
            Entrenar
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:underline"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
