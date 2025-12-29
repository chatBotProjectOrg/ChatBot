import {
  AppShell,
  Textarea,
  Button,
  ScrollArea,
  Box,
  Text,
  Divider,
  ActionIcon
} from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function App() {
  const [opened, setOpened] = useState(true);
  const [sessions, setSessions] = useState({});
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [message, setMessage] = useState("");

  const scrollRef = useRef(null);

  useEffect(() => {
    const id = Date.now().toString();
    setSessions({ [id]: [] });
    setCurrentSessionId(id);
  }, []);

  function createNewChat() {
    const id = Date.now().toString();
    setSessions(prev => ({ ...prev, [id]: [] }));
    setCurrentSessionId(id);
  }

  async function sendMessage() {
    if (!message.trim()) return;

    setSessions(prev => ({
      ...prev,
      [currentSessionId]: [
        ...prev[currentSessionId],
        { role: "user", content: message }
      ]
    }));

    setMessage("");

    const res = await axios.post("http://localhost:5000/api/chat", {
      message
    });

    setSessions(prev => ({
      ...prev,
      [currentSessionId]: [
        ...prev[currentSessionId],
        { role: "assistant", content: res.data.answer }
      ]
    }));
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, currentSessionId]);

  const currentChat = sessions[currentSessionId] || [];

  return (
    <AppShell
      padding={0}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened }
      }}
    >

      <AppShell.Navbar p="md">
        <Button fullWidth mb="md" onClick={createNewChat}>
          + New Chat
        </Button>

        <Divider mb="sm" />

        <ScrollArea>
          {Object.keys(sessions).map((id, index) => (
            <Box
              key={id}
              p="sm"
              mb="xs"
              style={{
                cursor: "pointer",
                borderRadius: "6px",
                backgroundColor:
                  id === currentSessionId ? "#e7f5ff" : "transparent"
              }}
              onClick={() => setCurrentSessionId(id)}
            >
              <Text size="sm">Chat {index + 1}</Text>
            </Box>
          ))}
        </ScrollArea>
      </AppShell.Navbar>

      {/* MAIN AREA */}
      <AppShell.Main>
        {/* TOP BAR */}
        <Box
          style={{
            height: 50,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            borderBottom: "1px solid #e9ecef"
          }}
        >
          <ActionIcon
            variant="light"
            onClick={() => setOpened(o => !o)}
          >
            <IconMenu2 size={20} />
          </ActionIcon>

          <Text ml="md" fw={600}>
            Chatbot
          </Text>
        </Box>

        {/* CHAT AREA */}
        <Box
          style={{
            height: "calc(100vh - 50px)",
            display: "flex",
            flexDirection: "column",
            padding: "16px"
          }}
        >
          <ScrollArea style={{ flex: 1 }}>
            {currentChat.map((msg, idx) => (
              <Box
                key={idx}
                mb="md"
                p="md"
                style={{
                  maxWidth: "70%",
                  borderRadius: "12px",
                  backgroundColor:
                    msg.role === "user" ? "#e7f5ff" : "#f1f3f5",
                  alignSelf:
                    msg.role === "user" ? "flex-end" : "flex-start"
                }}
              >
                <Text fw={600} mb={4}>
                  {msg.role === "user" ? "You" : "AI"}
                </Text>
                <Text style={{ whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </Text>
              </Box>
            ))}
            <div ref={scrollRef} />
          </ScrollArea>

          <Textarea
            placeholder="Type your message..."
            minRows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button fullWidth mt="sm" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
