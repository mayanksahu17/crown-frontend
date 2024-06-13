import { useState } from "react";
import { TotalIcon } from "../../../assets";
import { useAuth } from "../../../hooks/useAuth";
import Card from "./Card";
import { useEffect } from "react";
import clsx from "clsx";
import dashboardService from "../../../services/dashboardService";
import moment from "moment/moment";
import { FaRegClock } from "react-icons/fa6";

const HomeTabComponent = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(data[0].name);

  const { data: transactionData } = data.find((el) => {
    return el?.name === selectedTab;
  });

  const handleTabClick = (name) => {
    setSelectedTab(name);
  };

  return (
    <>
      <div
        className={clsx("hidden lg:flex items-center justify-between w-full")}
      >
        {data.map(({ name }, index) => (
          <p
            key={index}
            className={clsx(
              "text-sm font-light cursor-pointer w-full !p-0 !m-0 whitespace-nowrap underline-offset-4 decoration-[#911BB0] decoration-1",
              selectedTab === name && "underline"
            )}
            onClick={() => handleTabClick(name)}
          >
            {name}
          </p>
        ))}
      </div>
      <div className="mt-3 w-full h-full overflow-y-auto">
        {transactionData?.length > 0 ? (
          transactionData.map((el, index) => (
            <>
              <div className="w-full min-w-full h-[80px]" key={index}>
                <div className="flex flex-col items-start justify-between h-full text-white w-full ">
                  <div className="flex items-center justify-between w-full flex-grow">
                    <div className="flex items-center gap-2">
                      {/* TODO: Icon addition */}
                      <p className="capitalize ">{el.type}</p>
                    </div>
                    <p>${parseFloat(el?.amount).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between ">
                    <div className="flex items-center space-x-2">
                      <FaRegClock size="14" />
                      <p className="text-gray-600 font-light text-sm">
                        {el?.transaction_date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
    </>
  );
};

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
              totalReturns: parseFloat(
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
      name: "Total Returns",
      icon: TotalIcon,
      value: parseFloat(allData?.totalReturns)?.toFixed(2),
    },
    {
      name: "Total Investment",
      icon: TotalIcon,
      value: parseFloat(allData?.totalInvestment)?.toFixed(2),
    },
    {
      name: "Total Withdrawal",
      icon: TotalIcon,
      value: parseFloat(allData?.totalWithdrawal)?.toFixed(2),
    },
  ];

  const tabData = [
    {
      name: "All",
      data: allData.latestTransactions,
    },
    {
      name: "ROI",
      data: allData.latestROI,
    },
    {
      name: "R&B",
      data: allData.latestRnB,
    },
    {
      name: "Extra Income",
      data: allData.latestExtraIncome,
    },
  ];

  return (
    <div className="hidden lg:flex flex-col items-start bg-bgblue max-w-[19rem] w-full h-full py-10 px-6 ">
      <h1 className="text-2xl font-medium tracking-wide text-white mb-6 w-full">
        Dashboard
      </h1>
      <div className="flex flex-col w-full space-y-4">
        {cardsData.map((el, index) => (
          <Card key={index} {...el} />
        ))}
      </div>
      <h1 className="text-2xl font-medium tracking-wide text-white mt-6 w-full">
        Transaction
      </h1>
      <div className="mt-2 w-full">
        <HomeTabComponent data={tabData} />
      </div>
    </div>
  );
}
