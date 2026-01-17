"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useAssistants } from "@/hooks/useAssistants";
import { ChatSection } from "@/components/assistants/ChatSection";

export default function AssistantTrainingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { assistantsQuery, updateAssistant } = useAssistants();

  const assistant = assistantsQuery.data?.find((a) => a.id === id);

  const [isSaving, setIsSaving] = useState(false);
  const [draftRules, setDraftRules] = useState<string | null>(null);

  if (assistantsQuery.isLoading) {
    return (
      <p className="p-6 text-gray-500">Cargando asistente...</p>
    );
  }

  if (!assistant) {
    return (
      <p className="p-6 text-red-600">Asistente no encontrado</p>
    );
  }

  const hasChanges = draftRules !== null && draftRules !== assistant.rules;

  const handleSaveTraining = () => {
    if (!draftRules?.trim()) {
      alert("Debes ingresar instrucciones para entrenar al asistente.");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      updateAssistant.mutate({
        ...assistant,
        rules: draftRules,
      });

      setIsSaving(false);
      alert("Entrenamiento guardado correctamente");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* ================= HEADER ================= */}
      <header className="mb-8">
        {/* Flecha volver atrás */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">Volver</span>
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900">
          {assistant.name}
        </h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {assistant.language}
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {assistant.tone}
          </span>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ========== TRAINING ========== */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Entrenamiento del asistente
            </h2>
            {hasChanges && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">
                Cambios sin guardar
              </span>
            )}
          </div>

          <p className="mb-4 text-gray-600 text-sm">
            Define las instrucciones que guiarán el comportamiento del asistente. Sé
            claro y conciso para obtener mejores resultados.
          </p>

          <textarea
            key={assistant.id}
            defaultValue={assistant.rules}
            onChange={(e) => setDraftRules(e.target.value)}
            rows={10}
            placeholder="Ej: Responde de forma clara, amigable y orientada a ventas..."
            className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-300 shadow-sm"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSaveTraining}
              disabled={isSaving}
              className="rounded-lg bg-violet-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
            >
              {isSaving ? "Guardando..." : "Guardar entrenamiento"}
            </button>
          </div>
        </div>

        {/* ========== CHAT ========== */}
        <div className="rounded-2xl bg-gray-50 p-4 shadow-md">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            Chat simulado
          </h2>

          <p className="mb-4 text-xs text-gray-500">
            Prueba cómo respondería el asistente según su entrenamiento.
          </p>

          <div className="rounded-xl bg-gray-100 p-3">
            <ChatSection assistantId={assistant.id} />
          </div>
        </div>
      </section>
    </main>
  );
}

