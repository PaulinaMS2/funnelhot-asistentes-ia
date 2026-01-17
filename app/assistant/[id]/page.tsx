"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAssistants } from "@/hooks/useAssistants";
import { useAssistantsStore } from "@/store/assistants.store";
import { ChatSection } from "@/components/assistants/ChatSection";

export default function AssistantTrainingPage() {
  const { id } = useParams<{ id: string }>();
  const { assistantsQuery, updateAssistant } = useAssistants();
  const { selectAssistant } = useAssistantsStore();


  const assistant = assistantsQuery.data?.find(
    (a) => a.id === id
  );

  useEffect(() => {
    if (assistant) {
      selectAssistant(assistant);
    }
  }, [assistant, selectAssistant]);

  if (assistantsQuery.isLoading) {
    return <p className="p-6">Cargando asistente...</p>;
  }

  if (!assistant) {
    return <p className="p-6">Asistente no encontrado</p>;
  }

  return (
    <main className="p-6 space-y-8 max-w-3xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold">
          {assistant.name}
        </h1>
        <p className="text-gray-500">
          {assistant.language} · {assistant.tone}
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">
          Entrenamiento
        </h2>

        <textarea
          defaultValue={assistant.rules}
          rows={5}
          className="w-full border rounded p-2"
          onBlur={(e) =>
            updateAssistant.mutate({
              ...assistant,
              rules: e.target.value,
            })
          }
        />
      </section>

      <ChatSection assistantId={assistant.id} />
    </main>
  );
}
