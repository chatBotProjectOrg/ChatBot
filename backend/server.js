import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Chatbot backend running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
