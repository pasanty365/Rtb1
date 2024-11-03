import React from 'react';
import { Send, Plus, Globe2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Account {
  id: number;
  name: string;
  balance: number;
}

interface BalanceCardProps {
  account: Account;
  currency: string;
  onPrevious: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function BalanceCard({ 
  account,
  currency,
  onPrevious,
  onNext,
  hasNext,
  hasPrevious 
}: BalanceCardProps) {
  // Guard against undefined account
  if (!account) {
    return (
      <div className="mx-6 p-6 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl">
        <p className="text-white">Error loading account information</p>
      </div>
    );
  }

  return (
    <div className="relative mx-6">
      {hasPrevious && (
        <button 
          onClick={onPrevious}
          className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm z-10 hover:bg-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      
      <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-200 text-sm">{account.name}</p>
            <h2 className="text-3xl font-bold">{account.balance.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR'
            })}</h2>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <Globe2 className="w-4 h-4" />
            <span className="text-sm">{currency}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30">
            <Send className="w-4 h-4" />
            <span className="text-sm">Send</span>
          </button>
          <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Top Up</span>
          </button>
        </div>
      </div>

      {hasNext && (
        <button 
          onClick={onNext}
          className="absolute right-0 top-1/2 translate-x-3 -translate-y-1/2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm z-10 hover:bg-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}