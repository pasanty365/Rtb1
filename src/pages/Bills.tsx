import React, { useState } from 'react';
import { ChevronLeft, Calendar, Settings, ScrollText, Receipt, FileText, Download, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

type TabType = 'invoices' | 'receipts' | 'taxes';

interface Bill {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  type: TabType;
  fileUrl: string;
}

const bills: Bill[] = [
  {
    id: '1',
    title: 'Factura Luz - Marzo 2024',
    date: '2024-03-15',
    amount: 125.50,
    status: 'paid',
    type: 'invoices',
    fileUrl: '/bills/electric-march-2024.pdf'
  },
  {
    id: '2',
    title: 'Factura Agua - Marzo 2024',
    date: '2024-03-10',
    amount: 45.75,
    status: 'pending',
    type: 'invoices',
    fileUrl: '/bills/water-march-2024.pdf'
  },
  {
    id: '3',
    title: 'Recibo Comunidad - Marzo 2024',
    date: '2024-03-01',
    amount: 85.00,
    status: 'paid',
    type: 'receipts',
    fileUrl: '/bills/community-march-2024.pdf'
  },
  {
    id: '4',
    title: 'IBI 2024',
    date: '2024-02-15',
    amount: 450.00,
    status: 'paid',
    type: 'taxes',
    fileUrl: '/bills/ibi-2024.pdf'
  },
  {
    id: '5',
    title: 'IRPF 2023',
    date: '2024-01-30',
    amount: 1250.00,
    status: 'pending',
    type: 'taxes',
    fileUrl: '/bills/irpf-2023.pdf'
  }
];

export function Bills() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('invoices');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500 bg-green-500/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'overdue':
        return 'text-red-500 bg-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };

  const filteredBills = bills.filter(bill => bill.type === activeTab);

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
          <h1 className="text-xl font-bold">Bills & Taxes</h1>
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
            onClick={() => setActiveTab('invoices')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'invoices' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ScrollText className="w-4 h-4" />
            <span>Invoices</span>
          </button>
          <button
            onClick={() => setActiveTab('receipts')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'receipts' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Receipts</span>
          </button>
          <button
            onClick={() => setActiveTab('taxes')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'taxes' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Taxes</span>
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <button className="w-8 h-8 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {filteredBills.map((bill) => (
            <div
              key={bill.id}
              className="bg-[#1E1B2E] p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  {activeTab === 'invoices' ? (
                    <ScrollText className="w-5 h-5 text-purple-500" />
                  ) : activeTab === 'receipts' ? (
                    <Receipt className="w-5 h-5 text-blue-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{bill.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {new Date(bill.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">
                  {bill.amount.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </p>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Navigation onHomeClick={() => navigate('/')} />
    </div>
  );
}