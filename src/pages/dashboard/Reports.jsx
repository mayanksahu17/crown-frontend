import { useEffect, useState } from "react";
import {
  BIReport,
  ROIReport,
  RIReport,
  ExtraIncomeReport,
  WithdrawalReport,
} from "../../components";
import reportService from "../../services/reportService";
import { useAuth } from "../../hooks/useAuth";
import { FaChartLine, FaMoneyBillWave, FaHandHoldingUsd, FaArrowUp, FaDownload } from "react-icons/fa";
import { CgArrowsExchange } from "react-icons/cg";
import { BiFilterAlt } from "react-icons/bi";

export default function Reports() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("roi");
  const [filterDays, setFilterDays] = useState(30);

  const [allData, setAllData] = useState({
    allROIData: [],
    allBIData: [],
    allRIData: [],
    allExtraIncomeData: [],
    allWithdrawalData: [],
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [
          roiResponse,
          biResponse,
          riResponse,
          extraIncomeResponse,
          withdrawalResponse,
        ] = await Promise.all([
          reportService.getROIReport(user),
          reportService.getBIReport(user),
          reportService.getRIReport(user),
          reportService.getExtraIncomeReport(user),
          reportService.getWithdrawalReport(user),
        ]);
        
        if (roiResponse?.data?.success)
          handleDataChange("allROIData", roiResponse?.data?.data);

        if (biResponse?.data?.success)
          handleDataChange("allBIData", biResponse?.data?.data);

        if (riResponse?.data?.success)
          handleDataChange("allRIData", riResponse?.data?.data);

        if (extraIncomeResponse?.data?.success)
          handleDataChange(
            "allExtraIncomeData",
            extraIncomeResponse?.data?.data
          );

        if (withdrawalResponse?.data?.success)
          handleDataChange("allWithdrawalData", withdrawalResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "roi":
        return <ROIReport data={allData.allROIData} />;
      case "bi":
        return <BIReport data={allData.allBIData} />;
      case "ri":
        return <RIReport data={allData.allRIData} />;
      case "extra":
        return <ExtraIncomeReport data={allData.allExtraIncomeData} />;
      case "withdrawal":
        return <WithdrawalReport data={allData.allWithdrawalData} />;
      default:
        return <ROIReport data={allData.allROIData} />;
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Report</h1>
          <p className="text-gray-600">Let's check your update today</p>
        </div>

        {/* Tabs */}
        <div className="bg-[#1E293B] rounded-t-lg overflow-x-auto">
          <div className="flex">
            <button
              onClick={() => setActiveTab("roi")}
              className={`py-3 px-4 flex items-center ${activeTab === "roi" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
            >
              <FaChartLine className="mr-2" /> ROI Report
            </button>
            
            <button
              onClick={() => setActiveTab("bi")}
              className={`py-3 px-4 flex items-center ${activeTab === "bi" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
            >
              <FaMoneyBillWave className="mr-2" /> BI Report
            </button>
            
            <button
              onClick={() => setActiveTab("ri")}
              className={`py-3 px-4 flex items-center ${activeTab === "ri" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
            >
              <CgArrowsExchange className="mr-2" /> RI Report
            </button>
            
            <button
              onClick={() => setActiveTab("extra")}
              className={`py-3 px-4 flex items-center ${activeTab === "extra" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
            >
              <FaHandHoldingUsd className="mr-2" /> Extra Income Report
            </button>
            
            <button
              onClick={() => setActiveTab("withdrawal")}
              className={`py-3 px-4 flex items-center ${activeTab === "withdrawal" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
            >
              <FaArrowUp className="mr-2" /> Withdrawal Report
            </button>
          </div>
        </div>
        
        {/* Header for current tab */}
        <div className="bg-[#1E293B] p-4">
          <h2 className="text-xl text-white font-medium mb-4">
            {activeTab === "roi" && "Return on Investment Report"}
            {activeTab === "bi" && "Binary Income Report"}
            {activeTab === "ri" && "Referral Income Report"}
            {activeTab === "extra" && "Extra Income Report"}
            {activeTab === "withdrawal" && "Withdrawal Report"}
          </h2>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button className="bg-[#2D3748] text-white p-2 rounded-md flex items-center">
                <BiFilterAlt className="mr-2" /> All Reports
              </button>
              
              <button
                onClick={() => setFilterDays(30)}
                className={`px-3 py-1.5 text-white rounded-md ${filterDays === 30 ? 'bg-blue-600' : 'bg-[#2D3748]'}`}
              >
                Last 30 Days
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-[#1E293B] rounded-b-lg overflow-hidden p-4">
          {renderTabContent()}
        </div>
      </div>
    </>
  );
}
