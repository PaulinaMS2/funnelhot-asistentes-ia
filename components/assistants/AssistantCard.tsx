"use client";

import { Assistant } from "@/types/assistant";
import { Pencil, Trash2, Play } from "lucide-react";

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
    <div
      className="
        group
        rounded-xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
        hover:border-violet-400
      "
    >
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900">
        {assistant.name}
      </h3>

      {/* Meta */}
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
          {assistant.language}
        </span>
        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
          {assistant.tone}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-between">
        {/* Entrenar */}
        <button
          onClick={onTrain}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-violet-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <Play size={16} />
          Entrenar
        </button>

        {/* Edit / Delete */}
        <div className="flex gap-2 opacity-0 transition group-hover:opacity-100">
          
          {/* Editar */}
          <div className="relative group/tooltip">
            <button
              onClick={onEdit}
              aria-label="Editar asistente"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <Pencil size={16} />
            </button>

            <span
              className="
                pointer-events-none
                absolute
                -top-8
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                rounded
                bg-gray-900
                px-2
                py-1
                text-xs
                text-white
                opacity-0
                transition
                group-hover/tooltip:opacity-100
              "
            >
              Editar
            </span>
          </div>

          {/* Eliminar */}
          <div className="relative group/tooltip">
            <button
              onClick={onDelete}
              aria-label="Eliminar asistente"
              className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <Trash2 size={16} />
            </button>

            <span
              className="
                pointer-events-none
                absolute
                -top-8
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                rounded
                bg-gray-900
                px-2
                py-1
                text-xs
                text-white
                opacity-0
                transition
                group-hover/tooltip:opacity-100
              "
            >
              Eliminar
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
