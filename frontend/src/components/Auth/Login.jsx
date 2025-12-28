import { useState } from "react";
import { TextInput, PasswordInput, Button, Text, Title, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await login({ username, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="xl" radius="md" shadow="md" style={{ maxWidth: 420, margin: "auto" }}>
      <Title order={2} ta="center" mb="md">
        Admin Login
      </Title>

      <TextInput
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mt="md"
        required
      />

      {error && (
        <Text color="red" size="sm" mt="sm">
          {error}
        </Text>
      )}

      <Button
        fullWidth
        mt="lg"
        loading={loading}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Paper>
  );
}
