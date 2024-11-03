import React, { useState } from 'react';
import { Settings, TrendingUp, ArrowDown, ArrowUp, Wallet, Calendar, PiggyBank } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Calendar as CalendarView } from '../components/Calendar';
import { SearchBar } from '../components/SearchBar';
import { AIAssistant } from '../components/AIAssistant';
import type { AccountData } from '../App';

const accounts: AccountData[] = [
  { id: 0, name: "Principal", balance: 15420.89, trend: "up" },
  { id: 5, name: "Ahorro", balance: 25350.00, trend: "up" },
  { id: 1, name: "Los Volcanes 414", balance: 4823.67, trend: "up" },
  { id: 2, name: "El Morro, 26", balance: 12750.42, trend: "down" },
  { id: 3, name: "Holycan", balance: 8432.19, trend: "up" }
];

interface HomeProps {
  onAccountSelect: (accountId: number) => void;
}

export function Home({ onAccountSelect }: HomeProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const principalAccount = accounts[0];
  const savingsAccount = accounts[1];
  const propertyAccounts = accounts.slice(2);

  return (
    <div className="min-h-screen bg-[#13111C] text-white pb-20">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces" 
            alt="Profile" 
            className="w-10 h-10 rounded-full"
          />
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Hey, Alex</h1>
            <SearchBar onOpenAI={() => setShowAI(true)} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowCalendar(true)}
            className="w-10 h-10 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]"
          >
            <Calendar className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </header>

      {showCalendar && <CalendarView onClose={() => setShowCalendar(false)} />}
      <AIAssistant isOpen={showAI} onClose={() => setShowAI(false)} />

      <div className="px-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-200 text-sm">Saldo Total</p>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+2.4%</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {totalBalance.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR'
            })}
          </h2>
        </div>
      </div>

      <div className="px-6 mb-4">
        <button
          onClick={() => onAccountSelect(principalAccount.id)}
          className="w-full text-left flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-xl hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">{principalAccount.name}</p>
              <p className="text-sm text-white/80">Cuenta Personal</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {principalAccount.balance.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR'
              })}
            </p>
            <div className="flex items-center gap-1 justify-end">
              <ArrowUp className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/80">2.1%</span>
            </div>
          </div>
        </button>
      </div>

      <div className="px-6 mb-8">
        <button
          onClick={() => onAccountSelect(savingsAccount.id)}
          className="w-full text-left flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <PiggyBank className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">{savingsAccount.name}</p>
              <p className="text-sm text-white/80">Cuenta de Ahorro</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {savingsAccount.balance.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR'
              })}
            </p>
            <div className="flex items-center gap-1 justify-end">
              <ArrowUp className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/80">3.5%</span>
            </div>
          </div>
        </button>
      </div>

      <div className="px-6">
        <h2 className="text-lg font-semibold mb-4">Mis Inmuebles</h2>
        <div className="space-y-4">
          {propertyAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => onAccountSelect(account.id)}
              className="w-full text-left flex items-center justify-between bg-[#1E1B2E] p-4 rounded-xl hover:bg-[#252236] transition-colors"
            >
              <div>
                <p className="font-medium">{account.name}</p>
                <p className="text-sm text-gray-400">Cuenta Corriente</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {account.balance.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  {account.trend === 'up' ? (
                    <>
                      <ArrowUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">1.2%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">0.8%</span>
                    </>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  );
}