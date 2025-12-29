import { askOllama } from "../services/ollama.service.js";

let chatHistory = [];

const chargingStations = [
  { name: "EV Station A", city: "Durgapur", availableSlots: 5 },
  { name: "EV Station B", city: "Kolkata", availableSlots: 2 }
];

export async function chat(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    chatHistory.push({
      role: "user",
      content: message
    });

    const lowerMessage = message.toLowerCase();

    const dbResults = chargingStations.filter(st =>
      lowerMessage.includes(st.city.toLowerCase())
    );

    let answer = "";

    if (dbResults.length > 0) {
      answer =
        "Based on available data, here are the charging stations found:\n\n" +
        dbResults
          .map(
            st =>
              ` ${st.name}\nCity: ${st.city}\nAvailable Slots: ${st.availableSlots}`
          )
          .join("\n\n");
    } else {

      const aiResponse = await askOllama(message);
      answer =
        "Based on general information:\n\n" + aiResponse;
    }

    chatHistory.push({
      role: "assistant",
      content: answer
    });

    res.json({
      answer,
      chatHistory
    });

  } catch (error) {
    console.error("Chat controller error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
