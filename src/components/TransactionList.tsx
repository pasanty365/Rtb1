import React from 'react';
import { Droplet, BanknoteIcon, Wifi, Zap } from 'lucide-react';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'entertainment':
      return <Droplet className="w-5 h-5 text-blue-500" />;
    case 'income':
      return <BanknoteIcon className="w-5 h-5 text-green-500" />;
    case 'groceries':
      return <Wifi className="w-5 h-5 text-purple-500" />;
    default:
      return <Zap className="w-5 h-5 text-yellow-500" />;
  }
};

export function TransactionList({ transactions }: TransactionListProps) {
  return (
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
  );
}