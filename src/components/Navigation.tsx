import React from 'react';
import { Home, BarChart3, ArrowLeftRight, Calendar, TrendingUp } from 'lucide-react';

interface NavigationProps {
  onHomeClick?: () => void;
}

export function Navigation({ onHomeClick }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1F1D2B] border-t border-gray-800">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <NavItem 
            icon={<Home className="w-6 h-6" />} 
            label="Home" 
            active 
            onClick={onHomeClick}
          />
          <NavItem icon={<ArrowLeftRight className="w-6 h-6" />} label="Transfer" />
          <NavItem icon={<TrendingUp className="w-6 h-6" />} label="Invest" />
          <NavItem icon={<BarChart3 className="w-6 h-6" />} label="Stats" />
          <NavItem icon={<Calendar className="w-6 h-6" />} label="Calendar" />
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${
        active ? 'text-purple-500' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}