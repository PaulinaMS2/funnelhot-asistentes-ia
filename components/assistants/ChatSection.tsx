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
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Chat simulado
        </h2>
        <button
          onClick={() => resetChat(assistantId)}
          className="text-sm text-red-600"
        >
          Reiniciar
        </button>
      </div>

      <div className="border rounded p-4 space-y-2 h-64 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`text-sm ${
              msg.sender === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <span className="inline-block px-3 py-1 rounded bg-white border">
              {msg.content}
            </span>
          </div>
        ))}

        {isTyping && (
          <p className="text-sm text-gray-500">
            El asistente está escribiendo...
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Enviar
        </button>
      </div>
    </section>
  );
}
