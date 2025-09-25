import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatUI({
  messages,
  onSend,
  loading,
  persona,
}) {
  const inputRef = useRef();
  const chatEndRef = useRef();

  const handleSend = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (value) {
      onSend(value);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-[85vh] overflow-hidden relative px-40">

      {/* 1️⃣ Header Section */}
      <div className="flex items-center gap-3 px-25 py-3 bg-white border-b">
        {persona?.avatarImage ? (
          <img
            src={persona.avatarImage}
            alt={persona.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <span className="text-2xl">{persona?.avatar || "🤖"}</span>
        )}

        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-800">
            {persona?.name || "AI Assistant"}
          </h2>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* 2️⃣ Main Chat Section */}
      <div className="flex-1 overflow-y-auto px-25 py-4 space-y-3 bg-gray-50">
        {messages.length === 0 && !loading && (
          <p className="text-center text-gray-400 mt-10">
            Start a conversation ✨
          </p>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 max-w-[80%] md:max-w-[70%] rounded-xl shadow-sm break-words leading-relaxed text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-900 border rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {loading && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white border px-4 py-2 rounded-xl rounded-bl-none shadow-sm flex space-x-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce [animation-delay:0.2s]">•</span>
              <span className="animate-bounce [animation-delay:0.4s]">•</span>
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 3️⃣ Bottom Input Section */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 p-3 bg-white border-t"
      >
        <input
          ref={inputRef}
          className="flex-1 border rounded-full px-25 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 rounded-full font-medium transition ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow"
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
}
