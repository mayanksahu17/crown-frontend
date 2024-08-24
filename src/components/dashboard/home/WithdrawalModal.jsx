import React, { useState } from "react";
import withdrawalService from "../../../services/withdrawalService";
import Modal from "../global/Modal";
import { IoClose } from "react-icons/io5";
import Select from "../global/Select";
import { tokens } from "../../../constants/tokens";
import Button from "../global/Button";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const WithdrawalModal = ({
  isWithdrawalModalOpen,
  setIsWithdrawalModalOpen,
  selectedWallet,
  allData,
  setRender,
}) => {
  const { user } = useAuth();

  const [withdrawalData, setWithdrawalData] = useState({
    isOTPSentForWithdrawal: false,
    amount: 0,
    fromWallet: {
      label:
        selectedWallet === "rnb"
          ? "R&B Wallet"
          : selectedWallet === "roi"
          ? "ROI Wallet"
          : "Extra Inome Wallet",
      value:
        selectedWallet === "rnb"
          ? "R&B"
          : selectedWallet === "roi"
          ? "ROI"
          : "Interest",
    },
    securityPin: "",
    currency: {
      label: "Bitcoin",
      value: "BTC",
    },
    otp: "",
    isLoading: false,
  });
  const handleWithdrawalDataChange = (name, value) =>
    setWithdrawalData((prev) => ({ ...prev, [name]: value }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "8px",
      padding: "1px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff !important",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
      fontWeight: "400",
    }),
    option: (provided) => ({
      ...provided,
      color: "#000",
      fontWeight: "400",
      cursor: "pointer",
    }),
  };
  const handleWithdrawalSubmit = async () => {
    if (parseFloat(withdrawalData?.amount) < 15) {
      toast.error("Withdrawal amount has to be greater than $15");
      return;
    }
    if (
      Number(user?.user?.security_pin) !== Number(withdrawalData?.securityPin)
    ) {
      toast.error("Invalid security pin");
      return;
    }
    const amountUserCanWithdrawal = {
      "R&B": parseFloat(allData.referral_binary_wallet),
      ROI: parseFloat(allData.roi_wallet),
      Interest: parseFloat(allData.interest_wallet),
    };
    if (
      parseFloat(withdrawalData.amount) >
      amountUserCanWithdrawal[withdrawalData.fromWallet?.value]
    ) {
      toast.error(
        `You can only withdrawal $${amountUserCanWithdrawal[
          withdrawalData.fromWallet?.value
        ]?.toFixed(2)}`
      );
      return;
    }

    try {
      if (!withdrawalData.isOTPSentForWithdrawal) {
        handleWithdrawalDataChange("isLoading", true);
        const res = await withdrawalService.sentOTP(user);

        if (res.status === 200) {
          handleWithdrawalDataChange("isLoading", false);
          handleWithdrawalDataChange("isOTPSentForWithdrawal", true);
        }
      } else {
        const tempData = {
          amount: withdrawalData.amount,
          currency: "USDT.TRC20",
          from_wallet: withdrawalData.fromWallet?.value,
          security_pin: withdrawalData.securityPin,
          otp: withdrawalData.otp,
        };

        handleWithdrawalDataChange("isLoading", true);
        const res = await withdrawalService.createWithdrawal(user, tempData);

        if (res.status === 200) {
          handleWithdrawalDataChange("isLoading", false);
          toast.success("Withdrawal created successfully");
          setWithdrawalData({
            isOTPSentForWithdrawal: false,
            amount: 0,
            fromWallet: {
              label: "R&B Wallet",
              value: "R&B",
            },
            securityPin: "",
            currency: {
              label: "Bitcoin",
              value: "BTC",
            },
            otp: "",
            isLoading: false,
          });
          setRender((prev) => !prev);
          setIsWithdrawalModalOpen(false);
        }
      }
    } catch (error) {
      handleWithdrawalDataChange("isLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
    }
  };
  return (
    <div className="mt-4 flex flex-col text-white items-center justify-end">
      <div className="flex w-full items-center justify-end">
        <IoClose
          size="20"
          className="text-white cursor-pointer"
          onClick={() => {
            setWithdrawalData({
              isOTPSentForWithdrawal: false,
              amount: 0,
              fromWallet: {
                label: "R&B Wallet",
                value: "R&B",
              },
              securityPin: "",
              currency: {
                label: "Bitcoin",
                value: "BTC",
              },
              otp: "",
              isLoading: false,
            });
            setIsWithdrawalModalOpen(false);
          }}
        />
      </div>
      <div className="w-full">
        <p className="text-2xl text-white font-semibold leading-tighter">
          Withdraw Fund
        </p>
        <p className="text-base">
          Enter the amount you wish to withdraw from your account. Please note
          that the withdrawal request will be approved within 0 to 8 hours
        </p>
      </div>
      <div className="w-full mt-6">
        <label className="block text-[#fff] font-normal">Select Wallet</label>
        <Select
          options={[
            {
              label: "R&B Wallet",
              value: "R&B",
            },
            {
              label: "ROI Wallet",
              value: "ROI",
            },
            {
              label: "Extra Inome Wallet",
              value: "Interest",
            },
          ]}
          customStyles={customStyles}
          onChange={(val) => handleWithdrawalDataChange("fromWallet", val)}
          value={withdrawalData.fromWallet}
        />
      </div>
      <div className="w-full mt-6">
        <label className="block text-[#fff] font-normal">Enter Amount</label>
        <input
          type="text"
          name="amount"
          className="w-full bg-white px-2.5 py-2 border rounded-md text-black border-solid border-slate-200 outline-none mt-1 !ml-0"
          onChange={(e) => handleWithdrawalDataChange("amount", e.target.value)}
          value={withdrawalData.amount}
        />
      </div>
      {/* <div className="w-full mt-4">
        <label className="block text-[#fff] font-normal">
          Select Crypto Currency
        </label>
        <Select
          options={tokens}
          customStyles={customStyles}
          onChange={(val) => handleWithdrawalDataChange("currency", val)}
          value={withdrawalData.currency}
        />
      </div> */}
      <div className="w-full mt-6">
        <label className="block text-[#fff] font-normal">
          Enter Your Security Pin
        </label>
        <input
          type="text"
          name="securityPin"
          className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 text-black outline-none mt-1 !ml-0"
          value={withdrawalData.securityPin}
          onChange={(e) =>
            handleWithdrawalDataChange("securityPin", e.target.value)
          }
        />
      </div>

      {withdrawalData.isOTPSentForWithdrawal && (
        <div className="w-full mt-4">
          <label className="block text-[#fff] font-normal">Enter OTP</label>
          <input
            type="text"
            name="otp"
            className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 text-black !ml-0"
            value={withdrawalData.otp}
            onChange={(e) => handleWithdrawalDataChange("otp", e.target.value)}
          />
        </div>
      )}
      <Button
        className="mt-3"
        onClick={handleWithdrawalSubmit}
        loading={withdrawalData.isLoading}
      >
        Submit
      </Button>
    </div>
    // </Modal>
  );
};

export default WithdrawalModal;
