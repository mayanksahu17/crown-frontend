import React from "react";
import withdrawalService from "../../services/withdrawalService";

const WithdrawalModal = () => {
  const [withdrawalData, setWithdrawalData] = useState({
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
  const handleWithdrawalDataChange = (name, value) =>
    setWithdrawalData((prev) => ({ ...prev, [name]: value }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "1px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff !important",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#475569",
      fontWeight: "400",
    }),
    option: (provided) => ({
      ...provided,
      color: "#374151",
      fontWeight: "400",
      cursor: "pointer",
    }),
  };
  const handleWithdrawalSubmit = async () => {
    if (parseFloat(withdrawalData?.amount) < 25) {
      toast.error("Withdrawal amount has to be greater than $25");
      return;
    }
    if (
      Number(user?.user?.security_pin) !== Number(withdrawalData?.securityPin)
    ) {
      toast.error("Invalid security pin");
      return;
    }
    const amountUserCanWithdrawal = {
      "R&B": parseFloat(allData.totalRNB),
      ROI: parseFloat(allData.totalROI),
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
          currency: withdrawalData.currency.value,
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
          handleInputsChange("isWithdrawalModalOpen", false);
        }
      }
    } catch (error) {
      handleWithdrawalDataChange("isLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
    }
  };
  return (
    <Modal
      isOpen={inputs.isWithdrawalModalOpen}
      handleClose={() => {
        handleInputsChange("isWithdrawalModalOpen", false);
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
      }}
    >
      <div className="flex items-center justify-end">
        <IoClose
          size="20"
          className="text-gray-600 cursor-pointer"
          onClick={() => {
            handleInputsChange("isWithdrawalModalOpen", false);
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
          }}
        />
      </div>
      <div className="w-full">
        <p className="text-2xl text-gray-700 font-semibold leading-tighter">
          Withdraw Fund
        </p>
        <p className="text-base">
          Enter the amount you wish to withdraw from your account. Please note
          that the withdrawal process may take a few business days.
        </p>
      </div>
      <div className="w-full mt-4">
        <label className="block text-[#07153D] font-normal">
          Select Wallet
        </label>
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
              label: "Interest Wallet",
              value: "Interest",
            },
          ]}
          customStyles={customStyles}
          onChange={(val) => handleWithdrawalDataChange("fromWallet", val)}
          value={withdrawalData.fromWallet}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block text-[#07153D] font-normal">Enter Amount</label>
        <input
          type="text"
          name="amount"
          className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
          onChange={(e) => handleWithdrawalDataChange("amount", e.target.value)}
          value={withdrawalData.amount}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block text-[#07153D] font-normal">
          Select Crypto Currency
        </label>
        <Select
          options={tokens}
          customStyles={customStyles}
          onChange={(val) => handleWithdrawalDataChange("currency", val)}
          value={withdrawalData.currency}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block text-[#07153D] font-normal">
          Enter Your Security Pin
        </label>
        <input
          type="text"
          name="securityPin"
          className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
          value={withdrawalData.securityPin}
          onChange={(e) =>
            handleWithdrawalDataChange("securityPin", e.target.value)
          }
        />
      </div>

      {withdrawalData.isOTPSentForWithdrawal && (
        <div className="w-full mt-4">
          <label className="block text-[#07153D] font-normal">Enter OTP</label>
          <input
            type="text"
            name="otp"
            className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
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
    </Modal>
  );
};

export default WithdrawalModal;
