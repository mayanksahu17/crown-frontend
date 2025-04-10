import { useState } from "react";
import Button from "../global/Button";
import CustomSelect from "../global/CustomSelect";
import vouchersService from "../../../services/vouchersService";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateVoucher() {
  const { user } = useAuth();
  const handleNavigate = useNavigate();

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
        handleNavigate("/dashboard/vouchers/all");
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

  return (
    <div className="bg-white dark:bg-[#2D3748] p-6 rounded-lg max-w-2xl mx-auto shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Generate Voucher Card
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Enter Amount
        </label>
        <input
          type="number"
          className="w-full bg-gray-100 dark:bg-[#1E293B] text-gray-900 dark:text-white px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
          onChange={(e) => handleFromDataChange("amount", e.target.value)}
          value={formData.amount}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Select Wallet
        </label>
        <CustomSelect
          options={[
            { label: "R&B Wallet", value: "rnb" },
            { label: "ROI Wallet", value: "roi" },
            { label: "Extra Income Wallet", value: "interest" },
          ]}
          placeHolder="Select Wallet"
          handleChange={(value) =>
            handleFromDataChange("selectedWallet", value)
          }
          value={formData.selectedWallet}
          className="bg-gray-100 dark:bg-[#1E293B] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
        />
      </div>

      <Button
        className="w-full bg-green-500 hover:bg-green-600"
        loading={loadingStates.isVoucherLoading}
        onClick={handleVoucherSubmit}
      >
        Generate Voucher
      </Button>
    </div>
  );
}
