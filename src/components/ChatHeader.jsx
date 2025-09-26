import React from 'react';

export default function ChatHeader({ persona }) {
  if (!persona) return null;

  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b border-border">
      {/* Avatar with Online Status */}
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary bg-card flex items-center justify-center overflow-hidden">
          {persona.avatarImage ? (
            <img
              src={persona.avatarImage}
              alt={persona.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load, hide it and show emoji fallback
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <span 
            className={`text-xl sm:text-2xl flex items-center justify-center ${persona.avatarImage ? 'hidden' : 'flex'}`}
          >
            {persona.avatar}
          </span>
        </div>
        
        {/* Online Status Indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      {/* Name and Status */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-semibold text-white/80 truncate">{persona.name}</h2>
        <p className="text-xs sm:text-sm text-green-500 font-medium">● Online</p>
      </div>
    </div>
  );
}