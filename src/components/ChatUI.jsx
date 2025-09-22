import React, { useRef } from 'react';

export default function ChatUI({ messages, onSend, loading }) {
  const inputRef = useRef();

  const handleSend = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (value) {
      onSend(value);
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-[70vh] border rounded p-4 bg-white">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>{msg.content}</span>
          </div>
        ))}
        {loading && <div className="text-gray-400">AI is typing...</div>}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input ref={inputRef} className="flex-1 border rounded px-2 py-1" placeholder="Type your message..." disabled={loading} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded" disabled={loading}>Send</button>
      </form>
    </div>
  );
}
