import { useEffect, useState } from "react";
import { FaChartLine, FaDollarSign, FaUserFriends, FaChartBar } from "react-icons/fa";
import {
  AllPlans,
  DownlineActivation,
  PackageActivation,
} from "../../components";
import investmentService from "../../services/investmentService";
import { useAuth } from "../../hooks/useAuth";
import { packageData } from "../../components/dashboard/investments/data";
import Button from "../../components/dashboard/global/Button";

export default function Investment() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("allPlans");
  const [investmentStats, setInvestmentStats] = useState({
    totalInvestments: 124500.00,
    monthlyReturns: 2340.00,
    portfolioGrowth: 18.7,
  });

  const [allData, setAllData] = useState({
    allDownlineData: [],
    allPackageData: [],
    totalTokenAmount: 0,
    depositWalletAmount: 0,
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [downlineResponse, packageResponse] = await Promise.all([
          investmentService.getDownlineReport(user),
          investmentService.getPackageReport(user),
        ]);

        if (downlineResponse?.data?.success)
          handleDataChange("allDownlineData", downlineResponse?.data?.data);

        if (packageResponse?.data?.success)
          handleDataChange("allPackageData", packageResponse?.data?.data);
          
        // Calculate total investments from package data
        if (packageResponse?.data?.data?.length > 0) {
          const totalInvested = packageResponse.data.data.reduce((total, pkg) => 
            total + parseFloat(pkg.invested_amount || 0), 0);
            
          if (totalInvested > 0) {
            setInvestmentStats(prev => ({
              ...prev,
              totalInvestments: totalInvested
            }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "allPlans":
        return (
          <AllPlans
            data={{
              totalTokenAmount: allData.totalTokenAmount,
              depositWalletAmount: allData.depositWalletAmount,
            }}
          />
        );
      case "packageActivation":
        return <PackageActivation data={allData.allPackageData} />;
      case "downlineActivation":
        return <DownlineActivation data={allData.allDownlineData} />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {packageData.map((pkg, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="bg-green-500 p-4 text-white text-center relative">
                  <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2">
                    <img src={pkg.image} alt={pkg.name} className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                </div>
                
                <div className="p-6 bg-white">
                  <div className="text-center text-2xl font-bold mb-4">
                    ${pkg.minAmount} - ${pkg.maxAmount}
                  </div>
                  
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Daily Energy Yield</span>
                      <span className="font-semibold">{pkg.dailyReturns} - {parseFloat(pkg.dailyReturns) + 0.3}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="font-semibold">{pkg.durationInDays} days</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Total Energy Output</span>
                      <span className="font-semibold">{Math.round(parseFloat(pkg.dailyReturns) * pkg.durationInDays * 1.5)}% - {Math.round(parseFloat(pkg.dailyReturns) * pkg.durationInDays * 1.8)}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Referral Boost</span>
                      <span className="font-semibold">{7 + index}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Binary Power Surge</span>
                      <span className="font-semibold">10%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Power Capacity</span>
                      <span className="font-semibold">${index === 0 ? '1,000' : index === 1 ? '3,500' : '7,000'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Renewable Principle</span>
                      <span className="font-semibold">{50 + (index * 10)}%</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-6 bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      setActiveTab("allPlans");
                      setTimeout(() => {
                        const allPlansComponent = document.querySelector('[data-component="AllPlans"]');
                        if (allPlansComponent) {
                          allPlansComponent.querySelector(`[data-package-id="${pkg.id}"]`)?.click();
                        }
                      }, 100);
                    }}
                  >
                    Purchase
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Investment</h1>
        <p className="text-gray-600">Let's check your update today</p>
      </div>
      
      {/* Investment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Investments */}
        <div className="bg-[#1E293B] rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="bg-green-500 p-3 rounded-full">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div className="text-right">
              <h3 className="text-white text-2xl font-bold">${investmentStats.totalInvestments.toLocaleString()}</h3>
              <p className="text-green-400 mt-1">+12.5% from last month</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4">Total Investments</p>
        </div>
        
        {/* Monthly Returns */}
        <div className="bg-[#1E293B] rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="bg-green-500 p-3 rounded-full">
              <FaDollarSign className="text-white text-xl" />
            </div>
            <div className="text-right">
              <h3 className="text-white text-2xl font-bold">${investmentStats.monthlyReturns.toLocaleString()}</h3>
              <p className="text-green-400 mt-1">+5.2% from last month</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4">Monthly Returns</p>
        </div>
        
        {/* Portfolio Growth */}
        <div className="bg-[#1E293B] rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="bg-green-500 p-3 rounded-full">
              <FaChartBar className="text-white text-xl" />
            </div>
            <div className="text-right">
              <h3 className="text-white text-2xl font-bold">{investmentStats.portfolioGrowth}%</h3>
              <p className="text-green-400 mt-1">+2.3% from last year</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4">Portfolio Growth</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#1E293B] rounded-t-lg">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("allPlans")}
            className={`py-3 px-4 flex items-center ${activeTab === "allPlans" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
          >
            <FaChartLine className="mr-2" /> All Plans
          </button>
          
          <button
            onClick={() => setActiveTab("packageActivation")}
            className={`py-3 px-4 flex items-center ${activeTab === "packageActivation" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
          >
            <FaDollarSign className="mr-2" /> Package Activation
          </button>
          
          <button
            onClick={() => setActiveTab("downlineActivation")}
            className={`py-3 px-4 flex items-center ${activeTab === "downlineActivation" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
          >
            <FaUserFriends className="mr-2" /> Downline Activation
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-[#1E293B] rounded-b-lg" data-component="AllPlans">
        {renderTabContent()}
      </div>
    </div>
  );
}
