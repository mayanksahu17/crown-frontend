import clsx from "clsx";
import { Button, Card, Select, Modal, SelectWithInput } from "../../components";
import {
  TotalIcon,
  VerseBank,
  ExtraIncomeIcon,
  RNBIcon,
  ROIIcon,
  CouponsIcon,
} from "../../assets";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { useAuth } from "../../hooks/useAuth";
import walletService from "../../services/walletService";
import frontendURL from "../../constants/frontendURL";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../constants/tokens";
import depositService from "../../services/depositService";
import dashboardService from "../../services/dashboardService";
import UpdateWalletAddressModal from "../../components/dashboard/home/UpdateWalletAddressModal";
import withdrawalService from "../../services/withdrawalService";

import Loader from "../../components/dashboard/Loader";

export default function Home() {
  const { user } = useAuth();
  const handleNavigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [allData, setAllData] = useState({
    totalReturns: 0,
    totalInvestment: 0,
    totalWithdrawal: 0,
    totalEarning: 0,
    totalDeposit: 0,
    totalROI: 0,
    totalRNB: 0,
    latestTransactions: [],
    latestROI: [],
    latestRnB: [],
    latestExtraIncome: [],
    totalVoucherAmount: 0,
    isWithdrawalWalletUpdated:
      JSON.parse(localStorage.getItem("isWithdrawalWalletUpdated")) || false,
    leftBusiness: 0.0,
    rightBusiness: 0.0,
    leftWidth: 0.0,
    rightWidth: 0.0,
    target: 0.0,
    interest_wallet: 0.0,
    binary_career_level: 0,
  });

  const [inputs, setInputs] = useState({
    fromCurrencyCode: "",
    fromAmount: "",
    toCurrencyCode: "",
    toAmount: "",
    isWithdrawalModalOpen: false,
    isReInvestModalOpen: false,
    depositAmount: 0,
    selectedDepositCurrency: {
      label: "",
      value: "",
    },
    isDepositLoading: false,
  });

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

  const handleDepositSubmit = async () => {
    try {
      handleInputsChange("isDepositLoading", true);
      const depositResponse = await depositService.makeDeposit({
        from_currency: "USD",
        to_currency: inputs.selectedDepositCurrency?.value,
        amount: inputs.depositAmount,
        buyer_name: user?.user?.name,
        buyer_email: user?.user?.email,
        custom: `["${user?.user?.userId}","${inputs.selectedDepositCurrency?.value}"]`,
        ipn_endpoint: "/api/payment/deposit/ipn",
        email: user?.user?.email,
      });

      if (depositResponse.data.success) {
        handleInputsChange("isDepositLoading", false);
        handleInputsChange("isReInvestModalOpen", false);
        window.open(depositResponse.data.data.checkout_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputsChange = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        setIsDataLoaded(false);
        const response = await dashboardService.getDashboardData(user);
        const { success, data } = response?.data;
        console.log(data);
        if (success) {
          if (data) {
            let lWidth =
              (parseFloat(data?.left_business) -
                parseFloat(
                  parseFloat(data?.binary_next_level_actual_required) -
                    parseFloat(data?.binary_next_level_business)
                )) /
              parseFloat(data?.binary_next_level_business);
            let rWidth =
              (parseFloat(data?.right_business) -
                parseFloat(
                  parseFloat(data?.binary_next_level_actual_required) -
                    parseFloat(data?.binary_next_level_business)
                )) /
              parseFloat(data?.binary_next_level_business);
            console.log(lWidth, rWidth);
            setAllData((prev) => ({
              ...prev,
              totalInvestment: data?.total_investment,
              totalReturns:
                parseFloat(data?.total_earning) -
                parseFloat(data?.total_deposit),
              totalWithdrawal: data?.total_withdrawal,
              totalEarning: data?.total_earning,
              totalDeposit: data?.total_deposit,
              totalROI: data?.roi_wallet,
              totalRNB: data?.referral_binary_wallet,
              interest_wallet: data?.interest_wallet,
              totalVoucherAmount: data?.toal_voucher_generated,
              isWithdrawalWalletUpdated: data?.isWithdrawalWalletUpdated,
              leftBusiness: parseFloat(data?.left_business || 0)?.toFixed(2),
              rightBusiness: parseFloat(data?.right_business || 0)?.toFixed(2),
              leftWidth: lWidth * 100,
              rightWidth: rWidth * 100,
              target: data?.binary_next_level_business,
              binary_career_level: data?.binary_career_level,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoaded(true);
      }
    })();
  }, [user]);

  const cardsData = [
    {
      name: "Total Returns",
      icon: TotalIcon,
      value: allData?.totalReturns,
    },
    {
      name: "Total Investment",
      icon: TotalIcon,
      value: allData?.totalInvestment,
    },
    {
      name: "Total Withdrawal",
      icon: TotalIcon,
      value: allData?.totalWithdrawal,
    },
  ];

  const walletCardsData = [
    {
      name: "ROI Wallet",
      amount: parseFloat(allData.totalROI).toFixed(2),
      icon: ROIIcon,
      percentage: 10.01,
      percentageType: "increase",
      color: "#817EF2",
    },
    {
      name: "R&B Wallet",
      // amount: allData?.totalRNB || 0.0,
      amount: parseFloat(allData.totalRNB).toFixed(2),
      icon: RNBIcon,
      percentage: 5.07,
      percentageType: "decrease",
      color: "#911BB0",
    },
    {
      name: "Extra Income",
      amount: parseFloat(allData?.interest_wallet).toFixed(2),
      icon: ExtraIncomeIcon,
      percentage: 15.9,
      percentageType: "increase",
      color: "#000000",
    },
    {
      name: "Total Voucher Generated",
      amount: parseFloat(allData.totalVoucherAmount)?.toFixed(2),
      icon: CouponsIcon,
      percentage: 8.76,
      percentageType: "decrease",
      color: "#B9A164",
    },
  ];

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

  return !isDataLoaded ? (
    <Loader />
  ) : (
    <>
      <UpdateWalletAddressModal
        isOpen={allData.isWithdrawalWalletUpdated === false}
        handleClose={() => {
          setAllData((prev) => ({
            ...prev,
            isWithdrawalWalletUpdated: true,
          }));
        }}
      />
      <Modal
        isOpen={inputs.isReInvestModalOpen}
        handleClose={() => handleInputsChange("isReInvestModalOpen", false)}
      >
        <div className="flex items-center justify-end">
          <IoClose
            size="20"
            className="text-gray-600 cursor-pointer"
            onClick={() => handleInputsChange("isReInvestModalOpen", false)}
          />
        </div>
        <div className="w-full">
          <p className="text-2xl text-gray-700 font-semibold leading-tighter">
            Deposit Fund
          </p>
          <p className="text-base">
            Enter the amount you wish to deposit to your account. Please note
            that the desposit process may take a few business days.
          </p>
        </div>
        <div className="w-full mt-4">
          <label className="block text-[#07153D] font-normal">
            Enter Amount ($)
          </label>
          <input
            type="text"
            name="confirmEmail"
            className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
            placeholder="$100,000"
            value={inputs.depositAmount}
            onChange={(e) =>
              handleInputsChange("depositAmount", e.target.value)
            }
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-[#07153D] font-normal">
            Select Cryptocurrency
          </label>
          <Select
            options={tokens}
            customStyles={customStyles}
            value={inputs.selectedDepositCurrency}
            onChange={(value) =>
              handleInputsChange("selectedDepositCurrency", value)
            }
          />
        </div>
        <Button
          className="mt-3"
          onClick={handleDepositSubmit}
          loading={inputs.isDepositLoading}
        >
          Submit
        </Button>
      </Modal>
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
          <label className="block text-[#07153D] font-normal">
            Enter Amount
          </label>
          <input
            type="text"
            name="amount"
            className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
            onChange={(e) =>
              handleWithdrawalDataChange("amount", e.target.value)
            }
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
            <label className="block text-[#07153D] font-normal">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
              value={withdrawalData.otp}
              onChange={(e) =>
                handleWithdrawalDataChange("otp", e.target.value)
              }
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
      <div className="flex h-full w-full">
        <div className="flex flex-col items-start w-full">
          {/* Dashboard Cards */}
          <div className="flex flex-col w-full space-y-3 my-2 lg:hidden">
            {cardsData.map((el, index) => (
              <Card key={index} {...el} />
            ))}
          </div>

          {/* Bank Div */}
          <div className="mt-2 lg:mt-4 w-full">
            <div className="bg-[#000000] p-4 w-full text-white">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <img
                  src={VerseBank}
                  alt="crown Bank Logo"
                  className="w-5 sm:w-10"
                />
                <p className="font-normal text-sm lg:text-base ">
                  Crown Bankers
                </p>
              </div>
              <div className="mt-2 lg:mt-4">
                <p className="text-2xl font-semibold">Get Lots of Benefits!</p>
                <p className="opacity-80 font-normal mt-2 lg:mt-4 text-sm lg:text-base">
                  Upgrade now to get many benefits by using premium debit card.
                  No transaction limits!
                </p>
                <button
                  className="bg-white rounded-full px-4 py-2 lg:py-3 mt-4 lg:mt-6 text-[#351A5C] text-sm lg:text-base font-medium"
                  onClick={() =>
                    handleNavigate("/dashboard/investments/all-plans")
                  }
                >
                  Upgrade Premium
                </button>
              </div>
            </div>
          </div>

          {/* Wallets Div */}
          <div className="grid grid-cols-1 lg:grid-cols-3 my-4 gap-4 w-full justify-between">
            <div className="w-full bg-white p-3 rounded-lg lg:col-span-2">
              <h1 className="text-lg lg:text-xl text-black font-semibold mb-3">
                Wallets
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2 text-black w-full">
                {walletCardsData.map((el, index) => (
                  <div
                    key={index}
                    className={clsx("p-3 rounded-lg ")}
                    style={{
                      background: el.color,
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="w-[58px] h-[58px] bg-white rounded-full flex items-center justify-center">
                        <img
                          src={el.icon}
                          alt={el.name}
                          className="w-auto h-auto"
                        />
                      </div>
                      <h3 className="text-white font-medium text-2xl">
                        ${el.amount}
                      </h3>
                    </div>
                    <div className="mt-2 flex items-center justify-between w-full">
                      <p className="text-white font-normal">{el.name}</p>
                      {/* <div className="flex items-center space-x-2">
                        <p className="text-white font-normal">
                          {el.percentage}%
                        </p>
                        <FaArrowUp
                          className={clsx("text-white", {
                            "rotate-0": el.percentageType === "increase",
                            "rotate-180": el.percentageType !== "increase",
                          })}
                        />
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full mb-4 lg:mb-0 full flex flex-col justify-between h-full bg-white p-3 rounded-lg">
              <h1 className="text-lg lg:text-xl text-black font-semibold mb-3 ">
                Withdrawal Funds
              </h1>
              <div className="mt-2 lg:mt-4 h-full flex flex-col justify-between ">
                <div>
                  <h4 className="text-[#000000] font-normal text-xl">
                    Total Earnings
                  </h4>
                  <p className="font-semibold text-[#000000] text-3xl ">
                    ${allData?.totalEarning}
                  </p>
                </div>
                <div className="mt-4 w-full">
                  <button
                    className="rounded-full px-4 py-2.5 w-full bg-[#000000] text-white text-base font-normal disabled:bg-gray-900 "
                    onClick={() =>
                      handleInputsChange("isWithdrawalModalOpen", true)
                    }
                  >
                    Withdraw
                  </button>
                  <button
                    className="mt-2 rounded-full px-4 py-2.5 w-full bg-[#B9A164] text-white text-base font-normal"
                    onClick={() =>
                      // handleInputsChange("isReInvestModalOpen", true)
                      handleNavigate("/dashboard/investments/all-plans")
                    }
                  >
                    Reinvest
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Div */}
        </div>
      </div>
    </>
  );
}
