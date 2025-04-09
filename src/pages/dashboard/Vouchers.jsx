import { useState, useEffect } from "react";
import { FaTicketAlt, FaPlus, FaSearch } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import vouchersService from "../../services/vouchersService";
import toast from "react-hot-toast";
import { RiTicketLine } from "react-icons/ri";
import Button from "../../components/dashboard/global/Button";
import CustomSelect from "../../components/dashboard/global/CustomSelect";
import { AllVouchers, CreateVoucher } from "../../components";

export default function Vouchers() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");
  
  // Form state for creating a voucher
  const [formData, setFormData] = useState({
    selectedWallet: "",
    amount: 0,
  });

  const [loadingStates, setLoadingStates] = useState({
    isVoucherLoading: false,
  });

  const handleFromDataChange = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleLoadingState = (name, value) =>
    setLoadingStates((prev) => ({ ...prev, [name]: value }));

  // Fetch vouchers
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

  // Create voucher
  const handleVoucherSubmit = async () => {
    try {
      handleLoadingState("isVoucherLoading", true);
      const res = await vouchersService.createVoucher(user, {
        userId: user?.user?.userId,
        wallet: formData.selectedWallet?.value,
        amount: formData.amount,
        email: user?.user?.email,
      });
      if (res.status === 201) {
        handleLoadingState("isVoucherLoading", false);
        toast.success("Voucher created successfully");
        setActiveTab("list");
        fetchVouchers();
        setFormData({
          selectedWallet: "",
          amount: 0,
        });
      }
    } catch (error) {
      console.log(error);
      handleLoadingState("isVoucherLoading", false);
      toast.error("Error creating voucher");
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
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Voucher</h1>
        <p className="text-gray-600">Let's check your update today</p>
      </div>

      {/* Tabs */}
      <div className="bg-[#1E293B] rounded-t-lg">
        <div className="flex">
          <button
            onClick={() => setActiveTab("list")}
            className={`py-3 px-4 flex items-center ${activeTab === "list" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
          >
            <FaTicketAlt className="mr-2" /> Vouchers List
          </button>
          
          <button
            onClick={() => setActiveTab("create")}
            className={`py-3 px-4 flex items-center ${activeTab === "create" ? "border-b-2 border-green-400 text-white" : "text-gray-400"}`}
          >
            <FaPlus className="mr-2" /> Create Voucher
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-[#1E293B] rounded-b-lg p-5">
        {activeTab === "list" ? <AllVouchers /> : <CreateVoucher />}
      </div>
    </div>
  );
}
