import React from 'react';
import { personas } from '../personas/personas';

export default function PersonaSelector({ selectedPersonaId, onSelect }) {
  return (
    <div className="flex gap-4 mb-4">
      {personas.map((persona) => (
        <button
          key={persona.id}
          className={`p-3 rounded border-2 flex flex-col items-center transition-all duration-200 ${selectedPersonaId === persona.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}`}
          onClick={() => onSelect(persona.id)}
        >
          <span className="text-2xl mb-1">{persona.avatar}</span>
          <span className="text-xs font-semibold">{persona.name}</span>
        </button>
      ))}
    </div>
  );
}
