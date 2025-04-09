import { useEffect, useState } from "react";
import { GitBranch, Users, UserPlus } from "lucide-react";
import { BinaryTree, Referral } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import genealogyService from "../../services/genealogyService";

export default function Genealogy() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Referral");
  const [allData, setAllData] = useState({
    allBinaryData: [],
    allReferralData: [],
  });

  const handleAllDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [binaryTreeResponse, referralResponse] = await Promise.all([
          genealogyService.getBinaryTreeData(user),
          genealogyService.getReferralData(user),
        ]);

        if (binaryTreeResponse?.data?.success)
          handleAllDataChange("allBinaryData", binaryTreeResponse?.data?.data);

        if (referralResponse?.data?.success)
          handleAllDataChange("allReferralData", referralResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  // Get total counts from data
  const totalNetwork = allData.allReferralData?.length || 0;
  const directReferrals = allData.allReferralData?.filter(
    (ref) => ref?.referral?.level === 1
  ).length || 0;
  
  // Calculate network depth (maximum level)
  const networkDepth = allData.allReferralData?.reduce(
    (max, ref) => Math.max(max, ref?.referral?.level || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "Referral"
              ? "border-b-2 border-green-500 text-green-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("Referral")}
        >
          Referral
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "Binary Tree"
              ? "border-b-2 border-green-500 text-green-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("Binary Tree")}
        >
          Binary Tree
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "Referral" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Referral
          </h3>
          <Referral data={allData.allReferralData} />
        </div>
      )}

      {activeTab === "Binary Tree" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                  <Users className="text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Total Network
                </h3>
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {totalNetwork}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-green-500 text-sm font-medium">+{Math.floor(totalNetwork * 0.05)}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  from last month
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                  <UserPlus className="text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Direct Referrals
                </h3>
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {directReferrals}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-green-500 text-sm font-medium">+{Math.floor(directReferrals * 0.1)}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  from last month
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                  <GitBranch className="text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Network Depth
                </h3>
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {networkDepth} {networkDepth === 1 ? 'Level' : 'Levels'}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-green-500 text-sm font-medium">+1</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  from last month
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Network Structure
              </h3>
            </div>
            <div className="p-6">
              <BinaryTree data={allData.allBinaryData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
