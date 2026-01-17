import { Assistant } from "@/types/assistant";

let assistantsDB: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseLength: { short: 30, medium: 50, long: 20 },
    audioEnabled: true,
    rules:
      "Eres un asistente especializado en ventas. Sé cordial y detecta necesidades.",
  },
  {
    id: "2",
    name: "Soporte Técnico",
    language: "Inglés",
    tone: "Amigable",
    responseLength: { short: 20, medium: 30, long: 50 },
    audioEnabled: false,
    rules:
      "Ayudas a resolver problemas técnicos paso a paso.",
  },
];

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const assistantsService = {
  async getAll(): Promise<Assistant[]> {
    await delay(300);
    return [...assistantsDB];
  },

  async create(data: Assistant): Promise<Assistant> {
    await delay(300);
    assistantsDB.push(data);
    return data;
  },

  async update(updated: Assistant): Promise<Assistant> {
    await delay(300);
    assistantsDB = assistantsDB.map((a) =>
      a.id === updated.id ? updated : a
    );
    return updated;
  },

  async remove(id: string): Promise<void> {
    await delay(300);

    // 10% error simulado
    if (Math.random() < 0.1) {
      throw new Error("Error al eliminar asistente");
    }

    assistantsDB = assistantsDB.filter((a) => a.id !== id);
  },
};
