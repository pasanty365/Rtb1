import React, { useState } from 'react';
import { ChevronLeft, TrendingUp, PiggyBank, Target, Plus, ArrowDownRight, ArrowUpRight, Calendar, Settings } from 'lucide-react';
import { Navigation } from '../components/Navigation';

interface SavingsGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

interface SavingsTransaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'interest';
  amount: number;
  date: string;
  description: string;
}

const savingsGoals: SavingsGoal[] = [
  {
    id: 1,
    name: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 7500,
    deadline: "2024-12-31"
  },
  {
    id: 2,
    name: "New Car",
    targetAmount: 25000,
    currentAmount: 15350,
    deadline: "2025-06-30"
  },
  {
    id: 3,
    name: "Vacation",
    targetAmount: 5000,
    currentAmount: 2800,
    deadline: "2024-08-15"
  }
];

const transactions: SavingsTransaction[] = [
  {
    id: 1,
    type: 'deposit',
    amount: 1000,
    date: '2024-03-15',
    description: 'Monthly Savings'
  },
  {
    id: 2,
    type: 'interest',
    amount: 45.75,
    date: '2024-03-14',
    description: 'Interest Payment'
  },
  {
    id: 3,
    type: 'withdrawal',
    amount: -500,
    date: '2024-03-10',
    description: 'Emergency Expense'
  }
];

interface SavingsAccountProps {
  onBack: () => void;
}

export function SavingsAccount({ onBack }: SavingsAccountProps) {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const balance = 25350.00;
  const interestRate = 3.5;
  const nextInterestPayment = new Date('2024-04-01');

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
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
          <h1 className="text-xl font-bold">Savings Account</h1>
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
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-200 text-sm">Total Savings</p>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">{interestRate}% APY</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {balance.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR'
            })}
          </h2>
          <p className="text-sm text-white/80">
            Next interest payment: {nextInterestPayment.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Savings Goals</h2>
          <button
            onClick={() => setShowAddGoal(true)}
            className="w-8 h-8 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {savingsGoals.map((goal) => (
            <div key={goal.id} className="bg-[#1E1B2E] p-4 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{goal.name}</h3>
                  <p className="text-sm text-gray-400">
                    Target: {goal.targetAmount.toLocaleString('de-DE', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </p>
                </div>
                <Target className="w-5 h-5 text-purple-500" />
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(goal.currentAmount, goal.targetAmount)} transition-all`}
                  style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-400">
                  {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-400">
                  Due {new Date(goal.deadline).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between bg-[#1E1B2E] p-4 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  {transaction.type === 'deposit' ? (
                    <ArrowDownRight className="w-5 h-5 text-green-500" />
                  ) : transaction.type === 'interest' ? (
                    <PiggyBank className="w-5 h-5 text-purple-500" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
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