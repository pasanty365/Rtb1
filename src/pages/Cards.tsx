import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Settings, CreditCard, Wallet, History, Plus, Eye, Lock, Copy, Shield } from 'lucide-react';
import { Navigation } from '../components/Navigation';

type TabType = 'debit' | 'virtual' | 'transactions';

interface Card {
  id: string;
  type: 'debit' | 'virtual';
  name: string;
  lastFour: string;
  expiryDate: string;
  status: 'active' | 'blocked' | 'expired';
  limit: number;
  spent: number;
}

interface Transaction {
  id: string;
  cardLastFour: string;
  merchant: string;
  amount: number;
  date: string;
  type: 'purchase' | 'refund';
  status: 'completed' | 'pending';
}

const cards: Card[] = [
  {
    id: '1',
    type: 'debit',
    name: 'Principal Debit',
    lastFour: '4589',
    expiryDate: '12/25',
    status: 'active',
    limit: 2000,
    spent: 850
  },
  {
    id: '2',
    type: 'debit',
    name: 'Travel Card',
    lastFour: '7823',
    expiryDate: '03/26',
    status: 'blocked',
    limit: 1000,
    spent: 0
  },
  {
    id: '3',
    type: 'virtual',
    name: 'Online Shopping',
    lastFour: '1234',
    expiryDate: '06/24',
    status: 'active',
    limit: 500,
    spent: 125
  }
];

const transactions: Transaction[] = [
  {
    id: '1',
    cardLastFour: '4589',
    merchant: 'Amazon',
    amount: 79.99,
    date: '2024-03-15',
    type: 'purchase',
    status: 'completed'
  },
  {
    id: '2',
    cardLastFour: '1234',
    merchant: 'Netflix',
    amount: 12.99,
    date: '2024-03-14',
    type: 'purchase',
    status: 'completed'
  },
  {
    id: '3',
    cardLastFour: '4589',
    merchant: 'Zara',
    amount: 45.90,
    date: '2024-03-13',
    type: 'refund',
    status: 'pending'
  }
];

export function Cards() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('debit');
  const [showNewCardModal, setShowNewCardModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-500/20';
      case 'blocked':
        return 'text-red-500 bg-red-500/20';
      case 'expired':
        return 'text-gray-500 bg-gray-500/20';
      case 'completed':
        return 'text-green-500 bg-green-500/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };

  const filteredCards = cards.filter(card => card.type === activeTab);

  const renderCardList = () => (
    <div className="space-y-4">
      {filteredCards.map((card) => (
        <div
          key={card.id}
          className="bg-gradient-to-br from-[#2A2640] to-[#1E1B2E] p-6 rounded-xl space-y-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{card.name}</h3>
              <p className="text-sm text-gray-400">**** **** **** {card.lastFour}</p>
            </div>
            <span className={`text-sm px-2 py-0.5 rounded-full ${getStatusColor(card.status)}`}>
              {card.status}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Expires: {card.expiryDate}</span>
            <span>{((card.spent / card.limit) * 100).toFixed(0)}% used</span>
          </div>

          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${(card.spent / card.limit) * 100}%` }}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
              <Eye className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
              <Lock className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
              <Copy className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-[#1E1B2E] p-4 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-medium">{transaction.merchant}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  Card ending in {transaction.cardLastFour}
                </span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-medium ${transaction.type === 'refund' ? 'text-green-500' : ''}`}>
              {(transaction.type === 'refund' ? '+' : '-') + transaction.amount.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR'
              })}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(transaction.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#13111C] text-white pb-20">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Cards</h1>
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

      <div className="px-6">
        <div className="flex gap-2 mb-6 bg-[#1E1B2E] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('debit')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'debit' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Debit</span>
          </button>
          <button
            onClick={() => setActiveTab('virtual')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'virtual' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Virtual</span>
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'transactions' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {activeTab === 'debit' ? 'Debit Cards' : 
             activeTab === 'virtual' ? 'Virtual Cards' : 
             'Transaction History'}
          </h2>
          {activeTab !== 'transactions' && (
            <button 
              onClick={() => setShowNewCardModal(true)}
              className="w-8 h-8 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        {activeTab === 'transactions' ? renderTransactions() : renderCardList()}
      </div>

      <Navigation onHomeClick={() => navigate('/')} />
    </div>
  );
}