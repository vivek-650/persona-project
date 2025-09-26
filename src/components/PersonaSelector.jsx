import React from "react";
import { personas } from "../personas/personas";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";

export default function PersonaSelector({ selectedPersonaId, onSelect }) {
  const handleChat = (personaId) => {
    onSelect(personaId); // set selected persona in state and navigate
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
      {personas.map((persona) => (
        <Card 
          key={persona.id}
          className={`w-full max-w-[350px] mx-auto shadow-md hover:shadow-lg transition-all duration-300 ${selectedPersonaId === persona.id ? 'border-primary bg-primary/10 ' : 'hover:border-primary/90 bg-slate-200'}`}
        >
          <Card.Content className="pb-0 flex justify-center pt-4 sm:pt-6">
            {/* Avatar - Always show circular container */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary bg-card flex items-center justify-center overflow-hidden">
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
            <Card.Title className={`text-lg sm:text-xl font-bold ${selectedPersonaId === persona.id ? '' : 'hover:border-primary/90 text-muted-foreground'}`}>{persona.name}</Card.Title>
            {persona.description && (
              <Card.Description className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {persona.description}
              </Card.Description>
            )}
          </Card.Header>
          
          <Card.Content className="flex justify-center px-3 sm:px-6 pb-4 sm:pb-6">
            <Button
              className="w-full text-sm sm:text-base py-2 sm:py-3"
              onClick={() => handleChat(persona.id)}
            >
              Chat with {persona.name} 💬
            </Button>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
