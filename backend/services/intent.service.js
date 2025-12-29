import { askOllama } from "./ollama.service.js";

export async function detectIntent(question) {
  const prompt = `
Classify the intent into one:
- GENERATIVE
- DATABASE
- RAG

Question: "${question}"
Return only one word.
`;

  return (await askOllama(prompt)).trim();
}
