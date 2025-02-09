import { Navbar, HomeStats } from "../../components";

import { ExtraIncomeIcon, RNBIcon, ROIIcon, CouponsIcon } from "../../assets";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import UpdateWalletAddressModal from "../../components/dashboard/home/UpdateWalletAddressModal";
import { GoArrowDownLeft } from "react-icons/go";
import Loader from "../../components/dashboard/Loader";
import { MdArrowOutward } from "react-icons/md";
import WalletFeartures from "../../components/dashboard/home/WalletFeartures";
import HomeTabComponent from "../../components/dashboard/home/HomeTabComponent";
import userService from "../../services/userService";
import WithdrawalModal from "../../components/dashboard/home/WithdrawalModal";
import dashboardService from "../../services/dashboardService";
import TransferModal from "../../components/dashboard/home/TransferSection";
import { allowedTransferId, disbledUserIds } from "../../constants/tokens";
import Calculator from "../../components/dashboard/calculator/Calculator";

export default function Home() {
  const { user, updateUserDetails } = useAuth();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("roi");
  const handleNavigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [render, setRender] = useState(false);
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
    toal_voucher_generated: 0,
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
  const getSelectedWalletBalance = () => {
    let amount;
    switch (selectedWallet) {
      case "roi":
        amount = allData.roi_wallet;
        break;
      case "rnb":
        amount = allData.referral_binary_wallet;
        break;
      case "extra":
        amount = allData.interest_wallet;
        break;
      case "coupons":
        amount = allData.toal_voucher_generated;
        break;
      default:
        amount = 0;
        break;
    }
    return amount;
  };

  useEffect(() => {
    (async () => {
      try {
        const updatedUserResponse = await userService.getUserData(user);
        if (updatedUserResponse?.data?.success) {
          updateUserDetails(updatedUserResponse?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      console.log("calling api");
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
            setAllData((prev) => ({
              ...prev,
              totalInvestment: data?.total_investment,
              totalReturns:
                parseFloat(data?.total_earning) -
                parseFloat(data?.total_deposit),
              totalWithdrawal: data?.total_withdrawal,
              totalEarning: data?.total_earning,
              totalDeposit: data?.total_deposit,
              roi_wallet: data?.roi_wallet,
              referral_binary_wallet: data?.referral_binary_wallet,
              interest_wallet: data?.interest_wallet,
              toal_voucher_generated: data?.toal_voucher_generated,
              isWithdrawalWalletUpdated: data?.isWithdrawalWalletUpdated,
              binary_current_level_name: data?.binary_current_level_name,
              binary_next_level_name: data?.binary_next_level_name,
              leftBusiness: parseFloat(data?.left_business || 0)?.toFixed(2),
              rightBusiness: parseFloat(data?.right_business || 0)?.toFixed(2),
              leftWidth: lWidth * 100,
              rightWidth: rWidth * 100,
              target: data?.binary_next_level_business,
              binary_career_level: data?.binary_career_level,
              sponsor_email: data?.sponsor_email,
              sponsor_name: data?.sponsor_name,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoaded(true);
      }
    })();
  }, [render]);
  const cardsData = [
    {
      name: "ROI Wallet",
      icon: ROIIcon,
      value: "roi",
    },
    {
      name: "R&B Wallet",
      icon: RNBIcon,
      value: "rnb",
    },
    {
      name: "Extra Income Wallet",
      icon: ExtraIncomeIcon,
      value: "extra",
    },
    {
      name: "Coupons",
      icon: CouponsIcon,
      value: "coupons",
    },
  ];
  return !isDataLoaded ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col md:flex-row  h-full">
        <div className="w-full md:w-1/4">
          <HomeStats
            selectedWallet={selectedWallet}
            setSelectedWallet={(value) => setSelectedWallet(value)}
            cardsData={cardsData}
            allData={allData}
          />
        </div>
        <div className="flex w-full md:w-3/4  flex-col">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <WalletCard
              title="ROI Wallet"
              amount={parseFloat(allData?.roi_wallet).toFixed(2)}
              borderColor="bg-blue-500"
            />
            <WalletCard
              title="R&B Wallet"
              amount={parseFloat(allData?.referral_binary_wallet).toFixed(2)}
              borderColor="bg-green-500"
            />
            <WalletCard
              title="Extra income wallet"
              amount={parseFloat(allData?.interest_wallet).toFixed(2)}
              borderColor="bg-yellow-500"
            />
            <WalletCard
              title="Coupons"
              amount={parseFloat(allData?.toal_voucher_generated).toFixed(2)}
              borderColor="bg-orange-500"
            />
            <WalletCard
              title="Total Investment"
              amount={parseFloat(allData?.totalInvestment).toFixed(2)}
              borderColor="bg-gray-500"
            />
            <WalletCard
              title="Total Withdrawal"
              amount={parseFloat(allData?.totalWithdrawal).toFixed(2)}
              borderColor="bg-red-500"
            />
          </div>

          {!disbledUserIds?.includes(user?.user?.userId) && (
            <button
              className="rounded-full w-full px-4 py-2.5 w-full bg-gradient-to-l from-[#8011E8] to-[#CD6AFB] text-white text-base font-normal disabled:bg-gray-900 "
              onClick={() => setIsWithdrawalModalOpen(true)}
            >
              <div className="flex flex-row justify-center gap-4 w-full items-center ">
                <div className="">Withdraw</div>
                <div className="w-10 h-10 sm:w-10 sm:h-10 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                  <GoArrowDownLeft />
                </div>
              </div>
            </button>
          )}

          <button
            className="mt-2 rounded-full px-4 py-2.5 w-full bg-gradient-to-l from-[#FA895F] to-[#E753AE] text-white text-base font-normal"
            onClick={() => handleNavigate("/dashboard/vouchers/create")}
          >
            <div className="flex flex-row justify-center gap-4 w-full items-center ">
              <div className="">Reinvest</div>
              <div className="w-10 h-10 sm:w-10 sm:h-10 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                <MdArrowOutward />
              </div>
            </div>
          </button>
          {allowedTransferId === user?.user?.userId && (
            <button
              className="rounded-full w-full px-4 py-2.5 w-full bg-gradient-to-l from-[#8011E8] to-[#CD6AFB] text-white text-base font-normal disabled:bg-gray-900 "
              onClick={() => setIsTransferModalOpen(true)}
            >
              <div className="flex flex-row justify-center gap-4 w-full items-center ">
                <div className="">Transfer</div>
                <div className="w-10 h-10 sm:w-10 sm:h-10 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                  <GoArrowDownLeft />
                </div>
              </div>
            </button>
          )}
          <div className="flex flex-col md:flex-row w-full items-center gap-4 justify-center mt-12">
            <WalletFeartures />
            <HomeTabComponent allData={allData} />
          </div>
          {isWithdrawalModalOpen && (
            <WithdrawalModal
              isWithdrawalModalOpen={isWithdrawalModalOpen}
              setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
              selectedWallet={selectedWallet}
              allData={allData}
              setRender={setRender}
            />
          )}
          {isTransferModalOpen && (
            <TransferModal
              isTransferModalOpen={isTransferModalOpen}
              setIsTransferModalOpen={setIsTransferModalOpen}
              setRender={setRender}
            />
          )}
          {/* <Calculator /> */}
        </div>
      </div>
    </>
  );
}

const WalletCard = ({ title, amount, borderColor }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm p-4 border">
      <div className={`w-1 h-full rounded-l-lg ${borderColor}`}></div>
      <div className="ml-4">
        <div className="text-gray-500 font-medium text-sm">{title}</div>
        <p className="text-black font-bold text-lg">${amount}</p>
      </div>
    </div>
  );
};
{
  /* <button
                      className="mt-2 rounded-full px-4 py-2.5 w-full bg-[#000000] text-white text-base font-normal"
                      disabled={true}
                    >
                      <div className="flex flex-row justify-center gap-4 w-full items-center ">
                        <div className="">Transfer</div>
                        <div className="w-10 h-10 sm:w-10 sm:h-10 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                          <LuArrowLeftRight />
                        </div>
                      </div>
                    </button> */
}
