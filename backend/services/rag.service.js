import { askOllama } from "./ollama.service.js";

const documents = [
  "EV charging stations allow electric vehicles to recharge.",
  "Fast chargers reduce charging time significantly."
];

export async function ragAnswer(question) {
  const context = documents.join("\n");

  return askOllama(`
Use the context below to answer.

Context:
${context}

Question:
${question}
`);
}
