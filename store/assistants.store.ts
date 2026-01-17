import { create } from "zustand";
import { Assistant, ChatMessage } from "@/types/assistant";

type ModalMode = "create" | "edit";

interface AssistantsState {
  assistants: Assistant[];
  selectedAssistant: Assistant | null;

  // Modal
  isModalOpen: boolean;
  modalMode: ModalMode;

  // Chat por asistente (key = assistantId)
  chatHistory: Record<string, ChatMessage[]>;

  // Actions
  setAssistants: (assistants: Assistant[]) => void;
  selectAssistant: (assistant: Assistant | null) => void;

  openCreateModal: () => void;
  openEditModal: (assistant: Assistant) => void;
  closeModal: () => void;

  addChatMessage: (assistantId: string, message: ChatMessage) => void;
  resetChat: (assistantId: string) => void;
}

export const useAssistantsStore = create<AssistantsState>((set) => ({
  assistants: [],
  selectedAssistant: null,

  isModalOpen: false,
  modalMode: "create",

  chatHistory: {},

  // -------- Actions --------

  setAssistants: (assistants) =>
    set(() => ({
      assistants,
    })),

  selectAssistant: (assistant) =>
    set(() => ({
      selectedAssistant: assistant,
    })),

  openCreateModal: () =>
    set(() => ({
      isModalOpen: true,
      modalMode: "create",
      selectedAssistant: null,
    })),

  openEditModal: (assistant) =>
    set(() => ({
      isModalOpen: true,
      modalMode: "edit",
      selectedAssistant: assistant,
    })),

  closeModal: () =>
    set(() => ({
      isModalOpen: false,
      selectedAssistant: null,
    })),

  addChatMessage: (assistantId, message) =>
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [assistantId]: [
          ...(state.chatHistory[assistantId] || []),
          message,
        ],
      },
    })),

  resetChat: (assistantId) =>
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [assistantId]: [],
      },
    })),
}));
