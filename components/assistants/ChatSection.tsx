"use client";

import { useState} from "react";
import { useAssistantsStore } from "@/store/assistants.store";
import { simulatedResponses } from "@/lib/chatresponses";

interface Props {
  assistantId: string;
}

export function ChatSection({ assistantId }: Props) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const {
    chatHistory,
    addChatMessage,
    resetChat,
  } = useAssistantsStore();

  const messages = chatHistory[assistantId] || [];

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user" as const,
      content: input,
    };

    addChatMessage(assistantId, userMessage);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        simulatedResponses[
          Math.floor(
            Math.random() * simulatedResponses.length
          )
        ];

      addChatMessage(assistantId, {
        id: crypto.randomUUID(),
        sender: "assistant",
        content: response,
      });

      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <section className="space-y-4">
  {/* Header del chat */}
  <div className="flex justify-between items-center">
    <h2 className="text-lg font-semibold text-gray-900">
      Chat simulado
    </h2>
    <button
      onClick={() => resetChat(assistantId)}
      className="text-sm text-red-600 hover:underline"
    >
      Reiniciar
    </button>
  </div>

  {/* Contenedor de mensajes */}
  <div
    className="border rounded-lg p-4 space-y-2 h-64 overflow-y-auto bg-gray-100"
    style={{ scrollbarWidth: "thin" }}
  >
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`flex ${
          msg.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <span
          className={`inline-block px-3 py-1 rounded-lg max-w-xs break-words ${
            msg.sender === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          {msg.content}
        </span>
      </div>
    ))}

    {isTyping && (
      <div className="flex justify-start">
        <span className="inline-block px-3 py-1 rounded-lg bg-gray-200 text-gray-900 animate-pulse">
          El asistente está escribiendo...
        </span>
      </div>
    )}
  </div>

  {/* Input de mensaje */}
  <div className="flex gap-2">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="flex-1 text-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Escribe un mensaje..."
    />
    <button
      onClick={sendMessage}
      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Enviar
    </button>
  </div>
</section>
);     
}