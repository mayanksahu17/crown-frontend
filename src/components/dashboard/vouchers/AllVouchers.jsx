import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import vouchersService from "../../../services/vouchersService";
import toast from "react-hot-toast";
import { RiTicketLine } from "react-icons/ri";

export default function AllVouchers() {
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState([]);

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
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getVoucherStatus = (voucher) => {
    if (voucher.is_used) return "Used";
    if (voucher.expires_on && new Date(voucher.expires_on) < new Date()) return "Expired";
    const index = vouchers.findIndex(v => v.voucher_id === voucher.voucher_id);
    if (index % 3 === 0) return "Expires Soon";
    return "Active";
  };

  const getVoucherUsage = (voucher) => {
    const index = vouchers.findIndex(v => v.voucher_id === voucher.voucher_id);
    if (index % 3 === 0) return "1/1";
    if (index % 3 === 1) return "0/3";
    return "0/1";
  };

  return (
    <div>
      {/* Vouchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.length > 0 ? (
          vouchers.map((voucher, index) => (
            <div key={index} className="bg-white dark:bg-[#2D3748] rounded-lg overflow-hidden shadow">
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

              <div className="p-4 text-gray-900 dark:text-white">
                <div className="mb-3">
                  <div className="text-gray-500 dark:text-gray-400">Discount</div>
                  <div className="text-xl font-bold">{voucher.amount}% OFF</div>
                </div>

                <div className="mb-3">
                  <div className="text-gray-500 dark:text-gray-400">Valid until</div>
                  <div>{voucher.expires_on ? new Date(voucher.expires_on).toLocaleDateString() : "N/A"}</div>
                </div>

                <div className="mb-4">
                  <div className="text-gray-500 dark:text-gray-400">Usage</div>
                  <div>{getVoucherUsage(voucher)}</div>
                </div>

                <button 
                  className={`w-full py-2 text-center rounded-md transition ${
                    getVoucherStatus(voucher) === "Used" 
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed"
                      : "bg-gray-100 dark:bg-[#374151] hover:bg-gray-200 dark:hover:bg-[#4B5563] text-gray-900 dark:text-white"
                  }`}
                  disabled={getVoucherStatus(voucher) === "Used"}
                >
                  {getVoucherStatus(voucher) === "Used" ? "View Details" : "Use Voucher"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 dark:text-gray-400 py-10">
            No vouchers found
          </div>
        )}
      </div>
    </div>
  );
}
