import React from 'react';
import { ChevronLeft, TrendingUp, Send, Plus, CreditCard, Calendar, Settings, ArrowDownRight, ArrowUpRight, Coffee, ShoppingBag, Car, Utensils } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { SearchBar } from '../components/SearchBar';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: 'food' | 'income' | 'shopping' | 'transport' | 'coffee';
  category: string;
}

const transactions: Transaction[] = [
  { id: 1, name: 'Restaurante La Tasca', amount: -45.50, date: '2024-03-15', type: 'food', category: 'Dining' },
  { id: 2, name: 'Nómina Marzo', amount: 3200.00, date: '2024-03-14', type: 'income', category: 'Salary' },
  { id: 3, name: 'Mercadona', amount: -82.35, date: '2024-03-13', type: 'shopping', category: 'Groceries' },
  { id: 4, name: 'Gasolina Repsol', amount: -65.00, date: '2024-03-12', type: 'transport', category: 'Transport' },
  { id: 5, name: 'Café Starbucks', amount: -4.75, date: '2024-03-12', type: 'coffee', category: 'Coffee' }
];

const spendingByCategory = [
  { category: 'Dining', amount: 350.75, color: 'bg-orange-500' },
  { category: 'Transport', amount: 245.30, color: 'bg-blue-500' },
  { category: 'Groceries', amount: 520.85, color: 'bg-purple-500' },
  { category: 'Entertainment', amount: 180.50, color: 'bg-green-500' }
];

interface MainAccountProps {
  onBack: () => void;
}

export function MainAccount({ onBack }: MainAccountProps) {
  const balance = 15420.89;
  const monthlyIncome = 3200.00;
  const monthlySpending = 1297.40;

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
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Principal Account</h1>
            <SearchBar onOpenAI={() => {}} />
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

      <div className="px-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-200 text-sm">Available Balance</p>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+2.4%</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {balance.toLocaleString('de-DE', {
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

      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1E1B2E] p-4 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">Income</p>
            <p className="text-xl font-semibold text-green-500">
              {monthlyIncome.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR'
              })}
            </p>
          </div>
          <div className="bg-[#1E1B2E] p-4 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">Spending</p>
            <p className="text-xl font-semibold text-red-500">
              {monthlySpending.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR'
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
        <div className="bg-[#1E1B2E] p-4 rounded-xl space-y-4">
          {spendingByCategory.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm">{category.category}</p>
                <p className="text-sm">
                  {category.amount.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </p>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${category.color}`}
                  style={{ width: `${(category.amount / monthlySpending) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
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

      <Navigation onHomeClick={onBack} />
    </div>
  );
}