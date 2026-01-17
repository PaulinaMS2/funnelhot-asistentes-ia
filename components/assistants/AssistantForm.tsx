"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Assistant } from "@/types/assistant";
import { useAssistantsStore } from "@/store/assistants.store";
import { useAssistants } from "@/hooks/useAssistants";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { InfoTooltip } from "@/components/ui/InfoToolTip";

type FormValues = Omit<Assistant, "id">;

export function AssistantForm() {
  const [step, setStep] = useState<1 | 2>(1);

  const { modalMode, selectedAssistant, closeModal } =
    useAssistantsStore();
  const { createAssistant, updateAssistant } = useAssistants();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: selectedAssistant ?? {
      name: "",
      language: undefined,
      tone: undefined,
      responseLength: { short: 0, medium: 0, long: 0 },
      audioEnabled: false,
      rules: "",
    },
  });

  /* ---------------- WATCHED VALUES ---------------- */
  const name = watch("name");
  const language = watch("language");
  const tone = watch("tone");
  const responseLength = watch("responseLength");

  const total =
    responseLength.short +
    responseLength.medium +
    responseLength.long;

  /* ---------------- VALIDATIONS ---------------- */
  const isStepOneValid =
    name?.trim().length >= 3 &&
    Boolean(language) &&
    Boolean(tone);

  const isStepTwoValid = total === 100;

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = (data: FormValues) => {
    if (!isStepTwoValid) {
      alert(
        "La suma de porcentajes de las respuestas debe ser exactamente 100%"
      );
      return;
    }

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        {modalMode === "create"
          ? "Crear asistente"
          : "Editar asistente"}
      </h2>

      <StepIndicator step={step} />

      {/* ================= PASO 1 ================= */}
      {step === 1 && (
        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-800">
                Nombre del asistente *
              </label>

              <InfoTooltip
                text="El nombre debe tener al menos 3 caracteres para identificar correctamente al asistente."
              />
            </div>

            <input
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              })}
              placeholder="Ej: Asistente de ventas"
              className={`appearance-none outline-none mt-1 w-full rounded-lg bg-white p-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 ${
                errors.name
                  ? "border border-red-500 focus:ring-red-200"
                  : "border border-gray-300 focus:border-violet-500 focus:ring-violet-300"
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Idioma */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Idioma *
            </label>
            <select
              {...register("language", {
                required: "Selecciona un idioma",
              })}
              className={`appearance-none outline-none mt-1 w-full rounded-lg bg-white p-2 focus:ring-2 ${
                errors.language
                  ? "border border-red-500 focus:ring-red-200"
                  : "border border-gray-300 focus:border-violet-500 focus:ring-violet-300"
              } ${!language ? "text-gray-400" : "text-gray-900"}`}
            >
              <option value="">Selecciona un idioma</option>
              <option>Español</option>
              <option>Inglés</option>
              <option>Portugués</option>
            </select>

            {errors.language && (
              <p className="mt-1 text-sm text-red-600">
                {errors.language.message}
              </p>
            )}
          </div>

          {/* Tono */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Tono / Personalidad *
            </label>
            <select
              {...register("tone", {
                required: "Selecciona un tono",
              })}
              className={`appearance-none outline-none mt-1 w-full rounded-lg bg-white p-2 focus:ring-2 ${
                errors.tone
                  ? "border border-red-500 focus:ring-red-200"
                  : "border border-gray-300 focus:border-violet-500 focus:ring-violet-300"
              } ${!tone ? "text-gray-400" : "text-gray-900"}`}
            >
              <option value="">Selecciona un tono</option>
              <option>Formal</option>
              <option>Casual</option>
              <option>Profesional</option>
              <option>Amigable</option>
            </select>

            {errors.tone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tone.message}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={!isStepOneValid}
            onClick={() => setStep(2)}
            className="w-full rounded-lg bg-violet-600 py-2 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* ================= PASO 2 ================= */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-800">
              Distribución de longitud de respuestas (%)
            </p>

            <InfoTooltip
              text="La suma de respuestas cortas, medias y largas debe ser exactamente 100%. 
Ejemplo: short 30%, medium 50%, long 20%."
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(["short", "medium", "long"] as const).map(
              (key) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-700 capitalize">
                    {key}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0"
                    value={
                      responseLength[key] === 0
                        ? ""
                        : responseLength[key]
                    }
                    onChange={(e) =>
                      setValue(
                        `responseLength.${key}`,
                        e.target.value === ""
                          ? 0
                          : Number(e.target.value)
                      )
                    }
                    className="appearance-none outline-none mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
                  />
                </div>
              )
            )}
          </div>

          <p
            className={`text-sm ${
              isStepTwoValid
                ? "text-gray-500"
                : "text-red-600"
            }`}
          >
            Total: {total}% (debe ser 100%)
          </p>

          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input
              type="checkbox"
              {...register("audioEnabled")}
              className="accent-teal-600"
            />
            Habilitar respuestas de audio
          </label>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 rounded-lg border border-gray-400 bg-gray-200 py-2 text-gray-800 transition hover:bg-gray-300"
            >
              Atrás
            </button>

            <button
              type="submit"
              disabled={!isStepTwoValid}
              className="flex-1 rounded-lg bg-teal-600 py-2 text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
