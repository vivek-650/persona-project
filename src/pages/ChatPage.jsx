import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import ChatBottom from "../components/ChatBottom";
import Footer from "../components/Footer";
import { personas } from "../personas/personas";
// import { Button } from "@/components/retroui/Button";

export default function ChatPage({ selectedPersonaId, messages, onSendMessage, loading }) {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // Find the current persona
  const currentPersona = personas.find(p => p.id === selectedPersonaId);

  // Redirect if no persona selected
  useEffect(() => {
    if (!selectedPersonaId) {
      navigate("/");
    }
  }, [selectedPersonaId, navigate]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  if (!selectedPersonaId || !currentPersona) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60">
      {/* Header */}
      <ChatHeader persona={currentPersona} messages={messages} />

      {/* Chat Messages Area */}
      <div className="flex-1 p-2 sm:p-4 overflow-y-auto scrollbar-hide">
        <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 sm:py-12">
              <div className="bg-card border-2 border-primary p-4 sm:p-6 md:p-8 rounded-lg shadow-[4px_4px_0px_0px_rgba(255,219,51,1)]">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400 font-['Archivo_Black']">START CHAT!</h3>
                <p className="font-['Space_Grotesk'] text-sm sm:text-base">Send a message to begin your adventure with your selected persona.</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs md:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-md ${
                    message.role === "user"
                      ? "bg-primary text-black font-semibold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-gray-200 text-card-foreground border-2 border-border shadow-[2px_2px_0px_0px_rgba(255,219,51,0.3)]"
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed break-words">{message.content}</p>
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-card text-card-foreground border-2 border-primary max-w-[85%] sm:max-w-xs md:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-[2px_2px_0px_0px_rgba(255,219,51,0.3)]">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  {/* <span className="text-sm font-semibold">Thinking...</span> */}
                </div>
              </div>
            </div>
          )}
          
          {/* Auto-scroll target */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Chat Input */}
      <ChatBottom 
        onSend={onSendMessage}
        loading={loading}
        disabled={false}
      />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}