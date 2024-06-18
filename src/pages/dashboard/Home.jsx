import clsx from "clsx";
import {
  Button,
  Card,
  Select,
  Modal,
  SelectWithInput,
  Navbar,
  HomeStats,
} from "../../components";
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
import { GoArrowDownLeft } from "react-icons/go";
import Loader from "../../components/dashboard/Loader";
import { MdArrowOutward } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import WalletFeartures from "../../components/dashboard/home/WalletFeartures";
import HomeTabComponent from "../../components/dashboard/home/HomeTabComponent";

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

  return !isDataLoaded ? (
    <Loader />
  ) : (
    <>
      {/* <UpdateWalletAddressModal
        isOpen={allData.isWithdrawalWalletUpdated === false}
        handleClose={() => {
          setAllData((prev) => ({
            ...prev,
            isWithdrawalWalletUpdated: true,
          }));
        }}
      /> */}
      <div className="flex flex-col md:flex-row  h-full">
        <div className="w-full md:w-1/4 m-[-12px] lg:m-[-16px]">
          <HomeStats />
        </div>
        <div className="flex w-full md:w-3/4  flex-col">
          <div className="flex  justify-center items-center w-full">
            <div className="w-full md:w-3/4 justify-between bg-[#242424] mt-[-12px] lg:mt-[-16px] rounded-2xl ">
              <div className="w-full mt-4  full flex flex-col justify-between h-full  p-8 rounded-4xl">
                <Navbar />
                <div className="mt-8 h-full flex flex-col justify-between ">
                  <div>
                    <h4 className="text-[#919191] font-normal text-lg">
                      Available Balance
                    </h4>
                    <p className="font-semibold text-[#fff] text-3xl ">
                      ${allData?.totalEarning}
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <button
                      className="rounded-full w-full px-4 py-2.5 w-full bg-[#000000] text-white text-base font-normal disabled:bg-gray-900 "
                      onClick={() =>
                        handleInputsChange("isWithdrawalModalOpen", true)
                      }
                    >
                      <div className="flex flex-row justify-center gap-4 w-full items-center ">
                        <div className="">Withdraw</div>
                        <div className="w-10 h-10 sm:w-10 sm:h-10 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                          <GoArrowDownLeft />
                        </div>
                      </div>
                    </button>
                    <button
                      className="mt-2 rounded-full px-4 py-2.5 w-full bg-[#000000] text-white text-base font-normal"
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
                    {/* <button
                      className="mt-2 rounded-full px-4 py-2.5 w-full bg-[#000000] text-white text-base font-normal"
                      disabled={true}
                    >
                      <div className="flex flex-row justify-center gap-4 w-full items-center ">
                        <div className="">Transfer</div>
                        <div className="w-10 h-10 sm:w-10 sm:h-10 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                          <LuArrowLeftRight />
                        </div>
                      </div>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <WalletFeartures />
          <HomeTabComponent />
        </div>
      </div>
    </>
  );
}
