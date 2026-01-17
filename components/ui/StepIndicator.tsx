interface StepIndicatorProps {
  step: 1 | 2;
}

export function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        {/* Paso 1 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 1
                ? "bg-violet-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <span className="mt-2 text-xs text-gray-600">
            Datos básicos
          </span>
        </div>

        {/* Línea */}
        <div className="flex-1 h-px bg-gray-300">
          <div
            className={`h-px transition-all ${
              step === 2 ? "bg-violet-600" : "bg-gray-300"
            }`}
          />
        </div>

        {/* Paso 2 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step === 2
                ? "bg-violet-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <span className="mt-2 text-xs text-gray-600">
            Configuración
          </span>
        </div>
      </div>
    </div>
  );
}
