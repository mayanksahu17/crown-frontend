import { useState } from "react";
import {
  CouponsIcon,
  ExtraIncomeIcon,
  RNBIcon,
  ROIIcon,
} from "../../../assets";
import { useAuth } from "../../../hooks/useAuth";
import Card from "./Card";
import { useEffect } from "react";
import clsx from "clsx";
import dashboardService from "../../../services/dashboardService";
import moment from "moment/moment";
import { FaRegClock } from "react-icons/fa6";
import HomeTabComponent from "./HomeTabComponent";

export default function HomeStats() {
  const { user } = useAuth();
  const [allData, setAllData] = useState({
    totalReturns: 0,
    totalInvestment: 0,
    totalWithdrawal: 0,
    latestTransactions: [],
    latestROI: [],
    latestRnB: [],
    latestExtraIncome: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await dashboardService.getDashboardData(user);
        const { success, data } = response?.data;

        if (success) {
          if (data) {
            setAllData((prev) => ({
              ...prev,
              totalInvestment: data?.total_investment || 0,
              totalReturns:
                parseFloat(
                  parseFloat(data?.total_earning) -
                    parseFloat(data?.total_deposit)
                ).toFixed(4) || 0,
              totalWithdrawal: data?.total_withdrawal || 0,
              latestTransactions: data?.latestTransactions || 0,
              latestROI: data?.latestROI || 0,
              latestRnB: data?.latestRnB || 0,
              latestExtraIncome: data?.latestExtraIncome || 0,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const cardsData = [
    {
      name: "ROI Wallet",
      icon: ROIIcon,
    },
    {
      name: "R&B Wallet",
      icon: RNBIcon,
    },
    {
      name: "Extra Income Wallet",
      icon: ExtraIncomeIcon,
    },
    {
      name: "Coupons",
      icon: CouponsIcon,
    },
  ];

  return (
    <div className="hidden lg:flex flex-col items-start bg-[#141414] max-w-[19rem] w-full h-full min-h-screen  py-10 px-6 ">
      <div className="flex flex-col w-full space-y-4">
        {cardsData.map((el, index) => (
          <Card key={index} {...el} />
        ))}
      </div>

      <div className="mt-2 w-full">
        <HomeTabComponent />
      </div>
    </div>
  );
}
