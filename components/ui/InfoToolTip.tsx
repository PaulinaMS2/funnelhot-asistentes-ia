"use client";

import { Info } from "lucide-react";

interface Props {
  text: string;
}

export function InfoTooltip({ text }: Props) {
  return (
    <div className="relative group inline-flex items-center">
      <Info
        size={16}
        className="cursor-pointer text-gray-400 hover:text-gray-600"
      />

      <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100">
        {text}
      </div>
    </div>
  );
}
