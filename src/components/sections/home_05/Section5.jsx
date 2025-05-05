import { useState } from "react";

const QuoteRequestSection = () => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [packageDetails, setPackageDetails] = useState({
    name: "",
    duration: "",
    dailyRoi: "",
    returnRange: { min: 0, max: 0 },
    principalReturns: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [isValidAmount, setIsValidAmount] = useState(true);

  // Investment packages data
  const investmentPackages = [
    { 
      name: "Solar Starter", 
      minAmount: 25, 
      maxAmount: 2000, 
      duration: 150, 
      returnMultiplierMin: 2.25, 
      returnMultiplierMax: 2.7,
      principalReturnPercentage: 50
    },
    { 
      name: "Solar Growth", 
      minAmount: 2001, 
      maxAmount: 5000, 
      duration: 180, 
      returnMultiplierMin: 2.5, 
      returnMultiplierMax: 3.0,
      principalReturnPercentage: 60
    },
    { 
      name: "Power Growth", 
      minAmount: 5001, 
      maxAmount: 10000, 
      duration: 210, 
      returnMultiplierMin: 2.8, 
      returnMultiplierMax: 3.3,
      principalReturnPercentage: 75
    },
    { 
      name: "Solar Premium", 
      minAmount: 10001, 
      maxAmount: 50000, 
      duration: 210, 
      returnMultiplierMin: 2.8, 
      returnMultiplierMax: 3.3,
      principalReturnPercentage: 75
    }
  ];

  // Handle investment amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setInvestmentAmount(value);
    setShowResults(false);
    
    // Validate amount range
    const amount = Number(value);
    if (value === "" || amount < 25 || amount > 50000) {
      setIsValidAmount(false);
    } else {
      setIsValidAmount(true);
    }
  };

  // Calculate returns when button is clicked
  const calculateReturns = (e) => {
    e.preventDefault();
    
    if (!investmentAmount || isNaN(investmentAmount) || investmentAmount < 25 || investmentAmount > 50000) {
      setIsValidAmount(false);
      setShowResults(false);
      return;
    }
    
    setIsValidAmount(true);
    const amount = Number(investmentAmount);
    
    const matchedPackage = investmentPackages.find(
      pkg => amount >= pkg.minAmount && amount <= pkg.maxAmount
    );

    if (matchedPackage) {
      const minReturn = amount * matchedPackage.returnMultiplierMin;
      const maxReturn = amount * matchedPackage.returnMultiplierMax;
      const principalReturns = amount * (matchedPackage.principalReturnPercentage / 100);
      const dailyRoiMin = ((matchedPackage.returnMultiplierMin - 1) / matchedPackage.duration) * 100;
      const dailyRoiMax = ((matchedPackage.returnMultiplierMax - 1) / matchedPackage.duration) * 100;

      setPackageDetails({
        name: matchedPackage.name,
        duration: `${matchedPackage.duration} days`,
        dailyRoi: `${dailyRoiMin.toFixed(2)}% - ${dailyRoiMax.toFixed(2)}%`,
        returnRange: { 
          min: minReturn.toFixed(2), 
          max: maxReturn.toFixed(2) 
        },
        principalReturns: principalReturns.toFixed(2)
      });
      
      setShowResults(true);
    } else {
      // This should not happen with our validation, but just in case
      setPackageDetails({
        name: "Invalid Package",
        duration: "",
        dailyRoi: "",
        returnRange: { min: 0, max: 0 },
        principalReturns: 0
      });
      setShowResults(false);
    }
  };

  // Format currency for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="bg-gray-100">
      <section className="relative flex flex-col md:flex-row items-stretch min-h-[400px] sm:min-h-[300px] md:min-h-[400px] py-6 sm:py-12 mx-4 md:mx-24 gap-6">
        {/* Left Side - Background with money image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-cover bg-center flex items-center justify-center shadow-xl rounded-xl overflow-hidden">
          <img 
            src="/assets/money.png" 
            alt="Investment illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white/90 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-center shadow-2xl rounded-2xl">
          <h3 className="text-3xl md:text-4xl text-[#4CAF50] font-bold mb-8 text-center">
            Calculate Your Earnings
          </h3>
          <div className="space-y-6">
            {/* Investment Amount */}
            <div>
              <label
                htmlFor="investment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Investment Amount ($25 - $50,000)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="investment"
                  value={investmentAmount}
                  onChange={handleAmountChange}
                  className={`block w-full pl-8 pr-4 py-3 border ${
                    !isValidAmount ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent`}
                  placeholder="Enter investment amount"
                  min="25"
                  max="50000"
                />
              </div>
              {!isValidAmount && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid amount between $25 and $50,000
                </p>
              )}
            </div>

            {/* Package Info (Auto-populated) */}
            {showResults && packageDetails.name && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Package:</span>
                  <span className="text-[#4CAF50] font-semibold">{packageDetails.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Duration:</span>
                  <span className="text-[#4CAF50] font-semibold">{packageDetails.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Daily ROI:</span>
                  <span className="text-[#4CAF50] font-semibold">{packageDetails.dailyRoi}</span>
                </div>
              </div>
            )}

            {/* Results Display */}
            {showResults && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">ROI Returns:</span>
                  <span className="text-[#4CAF50] font-semibold">
                    {packageDetails.returnRange.min > 0 
                      ? `${formatCurrency(packageDetails.returnRange.min - Number(investmentAmount))} - ${formatCurrency(packageDetails.returnRange.max - Number(investmentAmount))}`
                      : "$0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Principal Returns:</span>
                  <span className="text-[#4CAF50] font-semibold">
                    {packageDetails.principalReturns > 0 
                      ? formatCurrency(packageDetails.principalReturns)
                      : "$0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total Returns:</span>
                  <span className="text-[#4CAF50] font-semibold">
                    {packageDetails.returnRange.min > 0 
                      ? `${formatCurrency(Number(packageDetails.returnRange.min - Number(investmentAmount)) + Number(packageDetails.principalReturns))} - ${formatCurrency(Number(packageDetails.returnRange.max - Number(investmentAmount)) + Number(packageDetails.principalReturns))}`
                      : "$0.00"}
                  </span>
                </div>
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={calculateReturns}
              className="w-full bg-[#4CAF50] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d8b40] transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Calculate Returns
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center mt-4">
              *Returns are estimated based on historical performance and market
              conditions. Actual returns may vary.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteRequestSection;