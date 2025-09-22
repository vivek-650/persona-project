
import React, { useState, useEffect } from 'react';
import PersonaSelector from './components/PersonaSelector';
import ChatUI from './components/ChatUI';
import { personas } from './personas/personas';

const App = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState(personas[0].id);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPersona = personas.find(p => p.id === selectedPersonaId);

  // Load chat history from localStorage when persona changes
  useEffect(() => {
    const saved = localStorage.getItem(`chat_history_${selectedPersonaId}`);
    setMessages(saved ? JSON.parse(saved) : []);
  }, [selectedPersonaId]);

  const handlePersonaSelect = (id) => {
    setSelectedPersonaId(id);
    // setMessages([]); // Now handled by useEffect
  };

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(`chat_history_${selectedPersonaId}`, JSON.stringify(messages));
  }, [messages, selectedPersonaId]);

  const handleSend = async (userInput) => {
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setLoading(true);
    try {
      // Get OpenAI API key from Vite env
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const chatHistory = [
        { role: 'system', content: currentPersona.systemPrompt },
        ...newMessages
      ];
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: chatHistory,
        })
      });
      const data = await res.json();
      const aiMsg = data.choices?.[0]?.message?.content || 'Sorry, something went wrong.';
      setMessages(msgs => [...msgs, { role: 'assistant', content: aiMsg }]);
    } catch {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Error: Unable to get response.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Persona Chatbot</h1>
      <PersonaSelector selectedPersonaId={selectedPersonaId} onSelect={handlePersonaSelect} />
      <div className="w-full max-w-xl">
        <ChatUI messages={messages} onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}

export default App