import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, EuroIcon, FileText, ScrollText } from 'lucide-react';

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/cards')}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-xs text-gray-300">Cards</span>
        </button>
        <button 
          onClick={() => navigate('/appraisal')}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
            <EuroIcon className="w-6 h-6 text-purple-500" />
          </div>
          <span className="text-xs text-gray-300">Tasar</span>
        </button>
        <button 
          onClick={() => navigate('/docs')}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-emerald-500" />
          </div>
          <span className="text-xs text-gray-300">Docs</span>
        </button>
        <button 
          onClick={() => navigate('/bills')}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
            <ScrollText className="w-6 h-6 text-orange-500" />
          </div>
          <span className="text-xs text-gray-300">Facturas</span>
        </button>
      </div>
    </div>
  );
}