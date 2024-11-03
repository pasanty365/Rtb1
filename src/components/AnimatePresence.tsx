import React from 'react';

interface AnimatePresenceProps {
  children: React.ReactNode;
}

export function AnimatePresence({ children }: AnimatePresenceProps) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}