import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import Chat from "./pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
