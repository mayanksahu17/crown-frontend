import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import vouchersService from "../../../services/vouchersService";
import toast from "react-hot-toast";
import { FaSearch, FaPlus } from "react-icons/fa";
import { RiTicketLine } from "react-icons/ri";

export default function AllVouchers() {
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const res = await vouchersService.getAllVouchers(user);
      if (res.status === 200) {
        setVouchers(res?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // Filter vouchers based on search
  const filteredVouchers = vouchers.filter(voucher => 
    voucher.voucher_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock voucher data status (since we don't have this in the API response)
  const getVoucherStatus = (voucher) => {
    // This is mock logic - you'd need to implement real logic based on your API data
    if (voucher.is_used) return "Used";
    if (voucher.expires_on && new Date(voucher.expires_on) < new Date()) return "Expired";
    
    // For demo purposes, let's alternate statuses
    const index = vouchers.findIndex(v => v.voucher_id === voucher.voucher_id);
    if (index % 3 === 0) return "Expires Soon";
    return "Active";
  };

  const getVoucherUsage = (voucher) => {
    // Mock usage data - replace with actual data from your API
    const index = vouchers.findIndex(v => v.voucher_id === voucher.voucher_id);
    if (index % 3 === 0) return "1/1";
    if (index % 3 === 1) return "0/3";
    return "0/1";
  };

  return (
    <div>
      {/* Search bar and Create Voucher button */}
      <div className="flex justify-between mb-5">
        <div className="relative w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-[#2D3748] border-none text-white rounded-md pl-10 pr-4 py-2.5 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search vouchers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => window.location.href = "/dashboard/vouchers/create"}
        >
          <FaPlus className="mr-2" /> Create Voucher
        </button>
      </div>

      {/* Vouchers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVouchers.length > 0 ? (
          filteredVouchers.map((voucher, index) => (
            <div key={index} className="bg-[#2D3748] rounded-lg overflow-hidden">
              <div className="p-4 flex justify-between items-center bg-green-500">
                <div className="flex items-center">
                  <RiTicketLine className="text-white text-2xl mr-2" />
                  <span className="text-white font-bold">{voucher.voucher_id}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  getVoucherStatus(voucher) === "Active" ? "bg-white text-green-500" :
                  getVoucherStatus(voucher) === "Expires Soon" ? "bg-yellow-100 text-yellow-600" :
                  "bg-gray-200 text-gray-600"
                }`}>
                  {getVoucherStatus(voucher)}
                </span>
              </div>
              
              <div className="p-4 text-white">
                <div className="mb-3">
                  <div className="text-gray-400">Discount</div>
                  <div className="text-xl font-bold">{voucher.amount}% OFF</div>
                </div>
                
                <div className="mb-3">
                  <div className="text-gray-400">Valid until</div>
                  <div>Dec 31, 2023</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-400">Usage</div>
                  <div>{getVoucherUsage(voucher)}</div>
                </div>
                
                <button 
                  className={`w-full py-2 text-center rounded-md ${
                    getVoucherStatus(voucher) === "Used" ? 
                    "bg-gray-700 text-gray-300 cursor-not-allowed" : 
                    "bg-[#374151] hover:bg-[#4B5563] text-white"
                  }`}
                  disabled={getVoucherStatus(voucher) === "Used"}
                >
                  {getVoucherStatus(voucher) === "Used" ? "View Details" : "Use Voucher"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400 py-10">
            No vouchers found
          </div>
        )}
      </div>

      {/* Redeem Voucher section */}
      <div className="mt-10 bg-[#2D3748] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Redeem Voucher</h2>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 bg-[#1E293B] border-none text-white rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Enter voucher code"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value)}
          />
          <button 
            className="bg-green-500 text-white px-6 py-2 rounded-md"
            disabled={isRedeeming || !redeemCode}
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
}
