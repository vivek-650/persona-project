import React from "react";
import { personas } from "../personas/personas";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";

export default function PersonaSelector({ selectedPersonaId, onSelect }) {
  const handleChat = (personaId) => {
    const persona = personas.find(p => p.id === personaId);
    // Only allow navigation if persona has system prompt
    if (persona && persona.systemPrompt && persona.systemPrompt.trim()) {
      onSelect(personaId); // set selected persona in state and navigate
    }
  };

  const isUpcoming = (persona) => {
    return !persona.systemPrompt || persona.systemPrompt.trim() === '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
      {personas.map((persona) => (
        <Card 
          key={persona.id}
          className={`w-full max-w-[350px] mx-auto shadow-md hover:shadow-lg transition-all duration-300 relative ${
            isUpcoming(persona) 
              ? 'bg-slate-200/70 backdrop-blur-sm border-gray-300' 
              : selectedPersonaId === persona.id 
                ? 'border-primary bg-primary/10' 
                : 'hover:border-primary/90 bg-slate-200'
          } ${isUpcoming(persona) ? 'blur-[0.5px]' : ''}`}
        >
          {/* Upcoming Badge */}
          {isUpcoming(persona) && (
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-primary text-black text-xs font-bold px-2 py-1 rounded shadow-sm">
                Upcoming
              </span>
            </div>
          )}
          
          <Card.Content className="pb-0 flex justify-center pt-4 sm:pt-6">
            {/* Avatar - Always show circular container */}
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary bg-card flex items-center justify-center overflow-hidden ${isUpcoming(persona) ? 'opacity-70' : ''}`}>
              {persona.avatarImage ? (
                <img
                  src={persona.avatarImage}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If image fails to load, hide it and show emoji fallback
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <span 
                className={`text-3xl sm:text-4xl flex items-center justify-center ${persona.avatarImage ? 'hidden' : 'flex'}`}
                style={persona.avatarImage ? {display: 'none'} : {display: 'flex'}}
              >
                {persona.avatar}
              </span>
            </div>
          </Card.Content>
          
          <Card.Header className="pb-2 text-center px-3 sm:px-6">
            <Card.Title className={`text-lg sm:text-xl font-bold ${
              isUpcoming(persona) 
                ? 'text-muted-foreground/70'
                : selectedPersonaId === persona.id 
                  ? '' 
                  : 'hover:border-primary/90 text-muted-foreground'
            }`}>{persona.name}</Card.Title>
            {persona.description && (
              <Card.Description className={`text-xs sm:text-sm text-muted-foreground line-clamp-2 ${
                isUpcoming(persona) ? 'opacity-70' : ''
              }`}>
                {persona.description}
              </Card.Description>
            )}
          </Card.Header>
          
          <Card.Content className="flex justify-center px-3 sm:px-6 pb-4 sm:pb-6">
            <Button
              className={`w-full text-sm sm:text-base py-2 sm:py-3 flex items-center justify-center text-center ${
                isUpcoming(persona) 
                  ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed opacity-75' 
                  : ''
              }`}
              onClick={() => handleChat(persona.id)}
              disabled={isUpcoming(persona)}
            >
              {isUpcoming(persona) ? `🚀 ${persona.name} - Upcoming` : `Chat with ${persona.name} 💬`}
            </Button>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
