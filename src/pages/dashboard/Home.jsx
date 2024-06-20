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

export default function Home() {
  const { user, updateUserDetails } = useAuth();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("roi");
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
        amount = allData.totalVoucherAmount;
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
        console.log(updatedUserResponse);
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
      try {
        setIsDataLoaded(false);
        const response = await dashboardService.getDashboardData(user);
        const { success, data } = response?.data;
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
              roi_wallet: data?.roi_wallet,
              referral_binary_wallet: data?.referral_binary_wallet,
              interest_wallet: data?.interest_wallet,
              toal_voucher_generated: data?.toal_voucher_generated,
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
        <div className="w-full md:w-1/4 m-[-12px] lg:m-[-16px]">
          <HomeStats
            selectedWallet={selectedWallet}
            setSelectedWallet={(value) => setSelectedWallet(value)}
            cardsData={cardsData}
          />
        </div>
        <div className="flex w-full md:w-3/4  flex-col">
          <div className="flex  justify-center items-center w-full">
            <div className="w-full md:w-3/4 justify-between bg-gradient-to-l from-[#221F1C] to-[#39272D] mt-[-12px] lg:mt-[-16px] rounded-2xl ">
              <div className="w-full mt-4  full flex flex-col justify-between h-full  p-8 rounded-4xl">
                <Navbar />
                <div className="mt-8 h-full flex flex-col justify-between ">
                  <div>
                    <h4 className="text-[#919191] font-normal text-lg">
                      Available Balance
                    </h4>
                    <p className="font-semibold text-[#fff] text-3xl ">
                      ${getSelectedWalletBalance()}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <button
                      className="rounded-full w-full px-4 py-2.5 w-full bg-gradient-to-l from-[#8011E8] to-[#CD6AFB] text-white text-base font-normal disabled:bg-gray-900 "
                      // onClick={() => setIsWithdrawalModalOpen(true)}
                    >
                      <div className="flex flex-row justify-center gap-4 w-full items-center ">
                        <div className="">Withdraw</div>
                        <div className="w-10 h-10 sm:w-10 sm:h-10 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                          <GoArrowDownLeft />
                        </div>
                      </div>
                    </button>

                    <button
                      className="mt-2 rounded-full px-4 py-2.5 w-full bg-gradient-to-l from-[#FA895F] to-[#E753AE] text-white text-base font-normal"
                      onClick={() =>
                        handleNavigate("/dashboard/investments/all-plans")
                      }
                    >
                      <div className="flex flex-row justify-center gap-4 w-full items-center ">
                        <div className="">Reinvest</div>
                        <div className="w-10 h-10 sm:w-10 sm:h-10 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                          <MdArrowOutward />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isWithdrawalModalOpen && (
            <>
              <WalletFeartures />
              <HomeTabComponent />
              <UpdateWalletAddressModal />
            </>
          )}
          {isWithdrawalModalOpen && (
            <WithdrawalModal
              isWithdrawalModalOpen={isWithdrawalModalOpen}
              setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
              selectedWallet={selectedWallet}
            />
          )}
        </div>
      </div>
    </>
  );
}
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
