import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Account } from './pages/Account';
import { Documentation } from './pages/Documentation';
import { Appraisal } from './pages/Appraisal';
import { MainAccount } from './pages/MainAccount';
import { SavingsAccount } from './pages/SavingsAccount';
import { Bills } from './pages/Bills';
import { Cards } from './pages/Cards';
import { AnimatePresence } from './components/AnimatePresence';

export type AccountData = {
  id: number;
  name: string;
  balance: number;
  trend?: string;
};

function AppContent() {
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const location = useLocation();

  const handleAccountSelect = (accountId: number) => {
    setSelectedAccountId(accountId);
  };

  const handleBackToHome = () => {
    setSelectedAccountId(null);
  };

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            selectedAccountId === 0 ? (
              <MainAccount onBack={handleBackToHome} />
            ) : selectedAccountId === 5 ? (
              <SavingsAccount onBack={handleBackToHome} />
            ) : selectedAccountId ? (
              <Account accountId={selectedAccountId} onBack={handleBackToHome} />
            ) : (
              <Home onAccountSelect={handleAccountSelect} />
            )
          } 
        />
        <Route path="/docs/*" element={<Documentation />} />
        <Route path="/appraisal" element={<Appraisal />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;