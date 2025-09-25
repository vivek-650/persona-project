// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import PersonaSelector from "./components/PersonaSelector";
import ChatUI from "./components/ChatUI";
import { personas } from "./personas/personas";
import LandingPage from "./pages/LandingPage";
import { Button } from "@/components/ui/button";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // If coming from /chat with state, use that persona, else default
  const initialPersonaId = location.state?.personaId || personas[0].id;
  const [selectedPersonaId, setSelectedPersonaId] = useState(initialPersonaId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPersona = personas.find((p) => p.id === selectedPersonaId);
  console.log("Current Persona:", currentPersona);
  // Load chat history from localStorage when persona changes
  useEffect(() => {
    const saved = localStorage.getItem(`chat_history_${selectedPersonaId}`);
    setMessages(saved ? JSON.parse(saved) : []);
  }, [selectedPersonaId]);

  const handlePersonaSelect = (id) => {
    setSelectedPersonaId(id);
    // Navigate to chat with selected persona
    navigate("/chat", { state: { personaId: id } });
  };

  // Save chat history
  useEffect(() => {
    localStorage.setItem(
      `chat_history_${selectedPersonaId}`,
      JSON.stringify(messages)
    );
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
      {/* Test button to verify Tailwind is working */}
      <div className="p-4">
        <Button className="bg-blue-500 hover:bg-blue-700">Test Tailwind Button</Button>
      </div>
      
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
              <ChatUI
                messages={messages}
                onSend={handleSend}
                loading={loading}
                persona={currentPersona}
              />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
