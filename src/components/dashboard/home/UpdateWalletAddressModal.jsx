import { IoClose } from "react-icons/io5";
import Modal from "../global/Modal";
import Button from "../global/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import walletAddressService from "../../../services/walletAddressService";
import { useAuth } from "../../../hooks/useAuth";
import userService from "../../../services/userService";

export default function UpdateWalletAddressModal({ isOpen, handleClose }) {
  const { user, updateUserDetails } = useAuth();
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

  const handleWalletAddressSubmit = async () => {
    try {
      setLoading(true);
      const res = await walletAddressService.updateWithdrawWallet(user, {
        otp,
        withdrawal_wallet: walletAddress,
      });

      if (res.status === 200) {
        const updatedUserResponse = await userService.getUserData(user);
        if (updatedUserResponse?.data?.success) {
          updateUserDetails(updatedUserResponse?.data?.data);
          toast.success("Wallet address updated Successfully");
          localStorage.setItem(
            "isWithdrawalWalletUpdated",
            JSON.stringify(true)
          );
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setLoading(true);
      const res = await walletAddressService.sendOTP(user);

      if (res.status === 200) {
        setLoading(false);
        setShowOtpInput(true);
      }
    } catch (error) {
      setLoading(false);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return !user?.user?.withdrawal_wallet ? (
    <div className="mt-4 text-white">
      <div className="w-full">
        <p className="text-xl text-white font-semibold leading-tight">
          Update Wallet Address
        </p>
        <div className="w-full font-light text-sm mt-1">
          Please enter your Withdrawal Wallet Address (Tether-TRC20(USDT.TRC20))
        </div>
      </div>

      <div className="w-full mt-4">
        {showOtpInput ? (
          <>
            <label className="block text-[#fff] font-normal">Enter OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-white px-2.5 py-2 border text-black rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
            />
          </>
        ) : (
          <>
            <label className="block text-[#fff] font-normal">
              Wallet Address
            </label>
            <input
              type="text"
              name="walletAddress"
              placeholder="Enter Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full bg-white px-2.5 py-2 border text-black rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
            />
          </>
        )}
        <Button
          className="mt-3"
          onClick={showOtpInput ? handleWalletAddressSubmit : handleOtpSubmit}
          loading={loading}
        >
          Continue
        </Button>
        <p className="text-xs mt-2">
          <span className="text-red-600 text-base mr-1">*</span>
          To keep your money safe, the address for your cryptocurrency wallet
          can't be changed later. Be careful and don't share important details
          to protect your money.
        </p>
      </div>
    </div>
  ) : (
    <div className="w-full mt-12  flex flex-col  items-start gap-2 ">
      <p className="text-2xl text-white font-semibold leading-tight ">
        Wallet Address
      </p>
      <div className="mx-[-20px]">
        <div className=" rounded-2xl bg-gradient-to-l text-sm from-[#8011E8] to-[#CD6AFB] p-4 max-w-full ">
          {user?.user?.withdrawal_wallet}
        </div>
      </div>
    </div>
  );
}
