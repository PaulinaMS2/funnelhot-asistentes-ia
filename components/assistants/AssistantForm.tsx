"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Assistant } from "@/types/assistant";
import { useAssistantsStore } from "@/store/assistants.store";
import { useAssistants } from "@/hooks/useAssistants";

type FormValues = Omit<Assistant, "id">;

export function AssistantForm() {
  const [step, setStep] = useState<1 | 2>(1);

  const {
    modalMode,
    selectedAssistant,
    closeModal,
  } = useAssistantsStore();

  const { createAssistant, updateAssistant } = useAssistants();

  const form = useForm<FormValues>({
    defaultValues: selectedAssistant
      ? {
          name: selectedAssistant.name,
          language: selectedAssistant.language,
          tone: selectedAssistant.tone,
          responseLength: selectedAssistant.responseLength,
          audioEnabled: selectedAssistant.audioEnabled,
          rules: selectedAssistant.rules,
        }
      : {
          name: "",
          language: "Español",
          tone: "Formal",
          responseLength: { short: 0, medium: 0, long: 0 },
          audioEnabled: false,
          rules: "",
        },
  });

  const { register, handleSubmit, watch, formState } = form;
  const { errors } = formState;

  const responseLength = watch("responseLength");

  const isStepOneValid =
    !errors.name &&
    !errors.language &&
    !errors.tone;

  const isResponseLengthValid =
    responseLength.short +
      responseLength.medium +
      responseLength.long ===
    100;

  const onSubmit = (data: FormValues) => {
    if (!isResponseLengthValid) return;

    if (modalMode === "create") {
      createAssistant.mutate({
        ...data,
        id: crypto.randomUUID(),
      });
    } else if (selectedAssistant) {
      updateAssistant.mutate({
        ...selectedAssistant,
        ...data,
      });
    }

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">
        {modalMode === "create"
          ? "Crear asistente"
          : "Editar asistente"}
      </h2>

      {step === 1 && (
        <>
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium">
              Nombre
            </label>
            <input
              {...register("name", {
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              })}
              className="w-full border rounded p-2"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Idioma */}
          <div>
            <label className="block text-sm font-medium">
              Idioma
            </label>
            <select
              {...register("language", { required: true })}
              className="w-full border rounded p-2"
            >
              <option>Español</option>
              <option>Inglés</option>
              <option>Portugués</option>
            </select>
          </div>

          {/* Tono */}
          <div>
            <label className="block text-sm font-medium">
              Tono
            </label>
            <select
              {...register("tone", { required: true })}
              className="w-full border rounded p-2"
            >
              <option>Formal</option>
              <option>Casual</option>
              <option>Profesional</option>
              <option>Amigable</option>
            </select>
          </div>

          <button
            type="button"
            disabled={!isStepOneValid}
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </>
      )}

      {step === 2 && (
        <>
          {/* Longitud respuestas */}
          <div className="grid grid-cols-3 gap-2">
            {(["short", "medium", "long"] as const).map(
              (key) => (
                <div key={key}>
                  <label className="block text-sm capitalize">
                    {key}
                  </label>
                  <input
                    type="number"
                    {...register(
                      `responseLength.${key}`,
                      { valueAsNumber: true }
                    )}
                    className="w-full border rounded p-2"
                  />
                </div>
              )
            )}
          </div>

          {!isResponseLengthValid && (
            <p className="text-red-600 text-sm">
              La suma debe ser 100%
            </p>
          )}

          {/* Audio */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("audioEnabled")}
            />
            Habilitar respuestas de audio
          </label>

          {/* Botones */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 border rounded py-2"
            >
              Atrás
            </button>

            <button
              type="submit"
              disabled={!isResponseLengthValid}
              className="flex-1 bg-green-600 text-white py-2 rounded disabled:opacity-50"
            >
              Guardar
            </button>
          </div>
        </>
      )}
    </form>
  );
}
