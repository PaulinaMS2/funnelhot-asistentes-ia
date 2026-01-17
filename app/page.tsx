"use client";

import { useRouter } from "next/navigation";
import { useAssistants } from "@/hooks/useAssistants";
import { useAssistantsStore } from "@/store/assistants.store";
import { AssistantCard } from "@/components/assistants/AssistantCard";
import { AssistantModal } from "@/components/assistants/AssistantModal";


export default function HomePage() {
  const router = useRouter();
  const { assistantsQuery, deleteAssistant } = useAssistants();

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
  <main className="min-h-screen bg-gray-50 p-8">
    
    {/* Header */}
    <header className="mb-10 space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
    
    {/* Título */}
      <div className="text-center sm:text-left sm:flex-1">
        <h1 className="text-3xl font-semibold text-gray-900">
          Asistentes IA
        </h1>
        <p className="mt-2 text-sm text-gray-500">
        Crea, entrena y gestiona tus asistentes inteligentes
        </p>
      </div>

    {/* Botón */}
      <button
        onClick={openCreateModal}
        className="inline-flex items-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-violet-700 active:scale-[0.98]"
      >
        + Crear asistente
      </button>
    </div>

    <AssistantModal />
  </header>

    {/* Contenido */}
    {assistants.length === 0 ? (
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <p className="text-lg font-medium text-gray-700">
          No tienes asistentes creados
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Crea tu primer asistente para empezar a entrenarlo
        </p>
      </div>
    ) : (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
