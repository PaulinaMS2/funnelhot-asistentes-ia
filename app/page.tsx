"use client";

import { useRouter } from "next/navigation";
import { useAssistants } from "@/hooks/useAssistants";
import { useAssistantsStore } from "@/store/assistants.store";
import { AssistantCard } from "@/components/assistants/AssistantCard";
import { AssistantModal } from "@/components/assistants/AssistantModal";


export default function HomePage() {
  const router = useRouter();
  const { assistantsQuery, deleteAssistant } = useAssistants();
  const { isModalOpen, modalMode } = useAssistantsStore();

  const {
    openCreateModal,
    openEditModal,
  } = useAssistantsStore();

  if (assistantsQuery.isLoading) {
    return <p className="p-6">Cargando asistentes...</p>;
  }

  if (assistantsQuery.isError) {
    return (
      <p className="p-6 text-red-600">
        Error al cargar asistentes
      </p>
    );
  }

  const assistants = assistantsQuery.data ?? [];

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Asistentes IA
        </h1>
        <AssistantModal />
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Crear asistente
        </button>
      </div>

      {assistants.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay asistentes creados aún.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {assistants.map((assistant) => (
            <AssistantCard
              key={assistant.id}
              assistant={assistant}
              onEdit={() => openEditModal(assistant)}
              onTrain={() =>
                router.push(`/assistant/${assistant.id}`)
              }
              onDelete={() =>
                deleteAssistant.mutate(assistant.id)
              }
            />
          ))}
        </div>
        
      )}
    </main>
  );
}
