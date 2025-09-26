// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { personas } from "./personas/personas";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Only set persona if explicitly passed, otherwise null
  const initialPersonaId = location.state?.personaId || null;
  const [selectedPersonaId, setSelectedPersonaId] = useState(initialPersonaId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPersona = personas.find((p) => p.id === selectedPersonaId);
  console.log("Current Persona:", currentPersona);
  // Load chat history from localStorage when persona changes
  useEffect(() => {
    if (selectedPersonaId) {
      const saved = localStorage.getItem(`chat_history_${selectedPersonaId}`);
      setMessages(saved ? JSON.parse(saved) : []);
    } else {
      setMessages([]);
    }
  }, [selectedPersonaId]);

  const handlePersonaSelect = (id) => {
    setSelectedPersonaId(id);
    // Navigate to chat with selected persona
    navigate("/chat", { state: { personaId: id } });
  };

  // Save chat history
  useEffect(() => {
    if (selectedPersonaId) {
      localStorage.setItem(
        `chat_history_${selectedPersonaId}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, selectedPersonaId]);

  const handleSend = async (userInput) => {
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const chatHistory = [
        { role: "system", content: currentPersona.systemPrompt },
        ...newMessages,
      ];

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: chatHistory,
        }),
      });

      const data = await res.json();
      const aiMsg =
        data.choices?.[0]?.message?.content || "Sorry, something went wrong.";
      setMessages((msgs) => [...msgs, { role: "assistant", content: aiMsg }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Error: Unable to get response." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div>
      
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <LandingPage
              selectedPersonaId={selectedPersonaId}
              onPersonaSelect={handlePersonaSelect}
            />
          }
        />

        {/* Chat Page */}
        <Route
          path="/chat"
          element={
            <div className="flex flex-col h-screen">
              <ChatPage
                selectedPersonaId={selectedPersonaId}
                messages={messages}
                onSendMessage={handleSend}
                loading={loading}
              />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
