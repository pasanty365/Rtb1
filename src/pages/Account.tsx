import React, { useState } from 'react';
import { Settings, ChevronLeft, CreditCard, Send, Plus, ArrowDownRight, ArrowUpRight, Coffee, ShoppingBag, Car, Utensils, Calendar } from 'lucide-react';
import { BalanceCard } from '../components/BalanceCard';
import { QuickActions } from '../components/QuickActions';
import { TransactionList } from '../components/TransactionList';
import { Navigation } from '../components/Navigation';

const accounts = [
  { id: 0, name: "Principal", balance: 15420.89 },
  { id: 1, name: "Los Volcanes 414", balance: 4823.67 },
  { id: 2, name: "El Morro, 26", balance: 12750.42 },
  { id: 3, name: "Holycan", balance: 8432.19 }
];

const personalTransactions = [
  { id: 1, name: 'Restaurante La Tasca', amount: -45.50, date: '2024-03-15', type: 'food' },
  { id: 2, name: 'Nómina Marzo', amount: 3200.00, date: '2024-03-14', type: 'income' },
  { id: 3, name: 'Mercadona', amount: -82.35, date: '2024-03-13', type: 'shopping' },
  { id: 4, name: 'Gasolina Repsol', amount: -65.00, date: '2024-03-12', type: 'transport' },
  { id: 5, name: 'Café Starbucks', amount: -4.75, date: '2024-03-12', type: 'coffee' }
];

const propertyTransactions = [
  { id: 1, name: 'Recibo de Agua', amount: -150.99, date: '2024-03-15', type: 'entertainment' },
  { id: 2, name: 'Alquiler mensual', amount: 3500.00, date: '2024-03-14', type: 'income' },
  { id: 3, name: 'Internet', amount: -29.00, date: '2024-03-13', type: 'groceries' },
  { id: 4, name: 'Recibo de Luz', amount: -95.00, date: '2024-03-12', type: 'transfer' }
];

interface AccountProps {
  accountId: number;
  onBack: () => void;
}

export function Account({ accountId, onBack }: AccountProps) {
  const [currency] = useState('EUR');
  const account = accounts.find(a => a.id === accountId);
  const accountIndex = accounts.findIndex(a => a.id === accountId);
  const isPrincipalAccount = accountId === 0;

  const [currentAccountIndex, setCurrentAccountIndex] = useState(accountIndex);

  // Guard against invalid account
  if (!account) {
    return (
      <div className="min-h-screen bg-[#13111C] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Account not found</h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentAccountIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentAccountIndex(prev => Math.min(accounts.length - 1, prev + 1));
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'food':
        return <Utensils className="w-5 h-5 text-orange-500" />;
      case 'income':
        return <ArrowDownRight className="w-5 h-5 text-green-500" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-purple-500" />;
      case 'transport':
        return <Car className="w-5 h-5 text-blue-500" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-yellow-500" />;
      default:
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#13111C] text-white pb-20">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces" 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold">Hey, Alex</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]">
            <Calendar className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </header>

      {isPrincipalAccount ? (
        <>
          <div className="px-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl">
              <p className="text-gray-200 text-sm mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold mb-4">
                {account.balance.toLocaleString('de-DE', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30">
                  <Send className="w-4 h-4" />
                  <span className="text-sm">Send</span>
                </button>
                <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Money</span>
                </button>
                <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">Cards</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-6">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {personalTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between bg-[#1E1B2E] p-4 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.amount.toLocaleString('de-DE', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 2
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <BalanceCard 
            account={accounts[currentAccountIndex]}
            currency={currency}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={currentAccountIndex > 0}
            hasNext={currentAccountIndex < accounts.length - 1}
          />
          <QuickActions />
          <TransactionList transactions={propertyTransactions} />
        </>
      )}

      <Navigation onHomeClick={onBack} />
    </div>
  );
}