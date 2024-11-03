import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onOpenAI: () => void;
}

export function SearchBar({ onOpenAI }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2 bg-[#1E1B2E] rounded-full px-4 py-2 transition-all ${
          isFocused ? 'ring-2 ring-purple-500' : ''
        }`}
      >
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Ask AI Assistant..."
          className="bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none w-48"
          onFocus={() => {
            setIsFocused(true);
            onOpenAI();
          }}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}