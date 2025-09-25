import React from "react";
import { personas } from "../personas/personas";

export default function PersonaSelector({ selectedPersonaId, onSelect }) {

  const handleChat = (personaId) => {
    onSelect(personaId); // set selected persona in state and navigate
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {personas.map((persona) => (
        <div
          key={persona.id}
          onClick={() => onSelect(persona.id)}
          className={`p-6 rounded-2xl border-2 shadow-md flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50 ${selectedPersonaId === persona.id ? 'border-blue-500 bg-blue-50' : ''}`}
        >
          {/* Avatar */}
          {persona.avatarImage ? (
            <img
              src={persona.avatarImage}
              alt={persona.name}
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            />
          ) : (
            <span className="text-6xl mb-2">{persona.avatar}</span>
          )}

          {/* Name */}
          <h4 className="mt-4 text-lg font-semibold">{persona.name}</h4>

          {/* Description */}
          <p className="mt-2 text-gray-600 text-sm">{persona.description}</p>

          {/* Chat Button */}
          <button
            className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition"
            onClick={(e) => {
              e.stopPropagation(); // prevent card onClick trigger
              handleChat(persona.id);
            }}
          >
            Chat 💬
          </button>
        </div>
      ))}
    </div>
  );
}
