import React, { useState } from 'react';
import { ChevronLeft, Home, EuroIcon, Calculator, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppraisalFormData {
  cadastralRef: string;
  salePrice: string;
  rentalPrice: string;
}

export function Appraisal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AppraisalFormData>({
    cadastralRef: '7089902DS5078N0002SF',
    salePrice: '',
    rentalPrice: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateAppraisal = () => {
    // Simulate API calculation with approximate values
    const baseValue = 250000;
    const randomVariation = Math.random() * 50000;
    const calculatedSalePrice = baseValue + randomVariation;
    const calculatedRentalPrice = calculatedSalePrice * 0.004; // 0.4% monthly rental yield

    setFormData(prev => ({
      ...prev,
      salePrice: calculatedSalePrice.toFixed(2),
      rentalPrice: calculatedRentalPrice.toFixed(2)
    }));
  };

  const handleAction = (action: 'sell' | 'rent') => {
    // Handle sell or rent action
    console.log(`Initiating ${action} process with price: ${action === 'sell' ? formData.salePrice : formData.rentalPrice}`);
  };

  return (
    <div className="min-h-screen bg-[#13111C] text-white">
      <header className="p-6 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#1E1B2E] flex items-center justify-center hover:bg-[#252236]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Property Appraisal</h1>
      </header>

      <div className="px-6 py-8">
        <div className="bg-[#1E1B2E] rounded-xl p-6 mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <Home className="w-6 h-6 text-purple-500" />
            <h2 className="text-lg font-semibold">Property Details</h2>
          </div>
          <p className="text-gray-400">Los Volcanes 414, 35509 Las Palmas</p>
          <div className="relative">
            <input
              type="text"
              name="cadastralRef"
              value={formData.cadastralRef}
              onChange={handleInputChange}
              placeholder="Enter cadastral reference"
              className="w-full bg-[#13111C] rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1E1B2E] rounded-xl p-6 space-y-6">
            <label className="block">
              <span className="text-gray-300 mb-2 block">Sale Price</span>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    className="w-full bg-[#13111C] rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Calculated sale price"
                    readOnly
                  />
                  <EuroIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                <button
                  onClick={() => handleAction('sell')}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  disabled={!formData.salePrice}
                >
                  Sell
                </button>
              </div>
            </label>

            <label className="block">
              <span className="text-gray-300 mb-2 block">Monthly Rental Price</span>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="rentalPrice"
                    value={formData.rentalPrice}
                    onChange={handleInputChange}
                    className="w-full bg-[#13111C] rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Calculated rental price"
                    readOnly
                  />
                  <EuroIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                <button
                  onClick={() => handleAction('rent')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  disabled={!formData.rentalPrice}
                >
                  Rent
                </button>
              </div>
            </label>
          </div>

          <button
            onClick={calculateAppraisal}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate Appraisal
          </button>
        </div>
      </div>
    </div>
  );
}