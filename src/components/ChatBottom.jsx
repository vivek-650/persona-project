import React, { useState, useRef } from "react";
import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { SendIcon } from "lucide-react";

export default function ChatBottom({ onSend, loading, disabled = false }) {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  // Function to play send sound effect
  const playSendSound = () => {
    try {
      const audio = new Audio('/sounds/note_3_sent_chat.mp3');
      audio.volume = 0.7; // Set volume to 50% to avoid being too loud
      audio.play().catch(error => {
        console.log('Could not play sound:', error);
      });
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  const handleSend = () => {
    if (message.trim() && !loading && !disabled) {
      playSendSound(); // Play sound before sending
      onSend(message.trim());
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="border-t-4 border-primary p-3 sm:p-4">
      {/* Retro Game Style Chat Input */}
      <div className="flex items-center gap-2 sm:gap-3 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        
        {/* Input Container with Retro Styling */}
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={loading ? "" : "Type your message here..."}
            disabled={loading || disabled}
            className="w-full pr-14 sm:pr-16 text-sm sm:text-base placeholder:text-muted-foreground focus:border-primary min-h-[44px]"
            maxLength={1000}
          />
          
          {/* Character Counter */}
          <div className="absolute bottom-1 right-3 text-xs text-muted-foreground">
            {message.length}/1000
          </div>
        </div>

        {/* Send Button with Retro Game Style */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || loading || disabled}
          size="icon"
          className="h-11 w-11 sm:h-12 sm:w-12 shadow-md hover:shadow-lg transition-all duration-200 shrink-0"
        >
          <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      {/* Status Messages */}
      {disabled && (
        <div className="text-center mt-2 text-sm text-muted-foreground">
          Chat is currently disabled
        </div>
      )}
    </div>
  );
}