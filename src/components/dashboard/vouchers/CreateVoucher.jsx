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
        toast.success("Vocuher created successfully");
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
    <div className="w-full flex items-center justify-center my-2">
      <div className="bg-white max-w-4xl w-full rounded-md p-4 ">
        <h1 className="mb-2 text-xl ">Generate Voucher Card</h1>
        <div className="w-full mb-3">
          <label className="block text-[#07153D] font-normal">
            Enter Amount
          </label>
          <input
            type="text"
            className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
            onChange={(e) => handleFromDataChange("amount", e.target.value)}
            value={formData.amount}
          />
        </div>

        <div>
          <label className="block text-[#07153D] font-normal">
            Select Wallet
          </label>
          <CustomSelect
            options={[
              {
                label: "R&B Wallet",
                value: "rnb",
              },
              {
                label: "ROI Wallet",
                value: "roi",
              },
              {
                label: "Extra Inome Wallet",
                value: "interest",
              },
            ]}
            placeHolder="Select Wallet"
            handleChange={(value) =>
              handleFromDataChange("selectedWallet", value)
            }
            value={formData.selectedWallet}
          />
        </div>

        <Button
          className="mt-4"
          loading={loadingStates.isVoucherLoading}
          onClick={handleVoucherSubmit}
        >
          Generate Voucher
        </Button>
      </div>
    </div>
  );
}
