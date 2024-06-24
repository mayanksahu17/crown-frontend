import { useEffect } from "react";
import {
  BIReport,
  Tab,
  ROIReport,
  RIReport,
  DepositReport,
  WithdrawalReport,
  ExtraIncomeReport,
  TokenReport,
} from "../../components";
import reportService from "../../services/reportService";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export default function Reports() {
  const { user } = useAuth();

  const [allData, setAllData] = useState({
    allROIData: [],
    allBIData: [],
    allRIData: [],
    allDepositData: [],
    allExtraIncomeData: [],
    allTokenData: [],
    allWithdrawalData: [],
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [
          roiResponse,
          biResponse,
          riResponse,
          extraIncomeResponse,
          withdrawalResponse,
        ] = await Promise.all([
          reportService.getROIReport(user),
          reportService.getBIReport(user),
          reportService.getRIReport(user),
          // reportService.getDepositReport(user),
          reportService.getExtraIncomeReport(user),
          // reportService.getTokenReport(user),
          reportService.getWithdrawalReport(user),
        ]);
        console.log(roiResponse);
        if (roiResponse?.data?.success)
          handleDataChange("allROIData", roiResponse?.data?.data);

        if (biResponse?.data?.success)
          handleDataChange("allBIData", biResponse?.data?.data);

        if (riResponse?.data?.success)
          handleDataChange("allRIData", riResponse?.data?.data);

        // if (depositResponse?.data?.success)
        //   handleDataChange("allDepositData", depositResponse?.data?.data);

        if (extraIncomeResponse?.data?.success)
          handleDataChange(
            "allExtraIncomeData",
            extraIncomeResponse?.data?.data
          );

        // if (tokenResponse?.data?.success)
        //   handleDataChange("allTokenData", tokenResponse?.data?.data);

        if (withdrawalResponse?.data?.success)
          handleDataChange("allWithdrawalData", withdrawalResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const data = [
    {
      name: "ROI Report",
      route: "/dashboard/reports/roi",
      children: <ROIReport data={allData.allROIData} />,
    },
    {
      name: "BI Report",
      route: "/dashboard/reports/bi",
      children: <BIReport data={allData.allBIData} />,
    },
    {
      name: "RI Report",
      route: "/dashboard/reports/ri",
      children: <RIReport data={allData.allRIData} />,
    },
    // {
    //   name: "Deposits Report",
    //   route: "/dashboard/reports/deposits",
    //   children: <DepositReport data={allData.allDepositData} />,
    // },
    {
      name: "Extra Income Report",
      route: "/dashboard/reports/extra-income",
      children: <ExtraIncomeReport data={allData.allExtraIncomeData} />,
    },
    // {
    //   name: "Tokens Report",
    //   route: "/dashboard/reports/tokens",
    //   children: <TokenReport data={allData.allTokenData} />,
    // },
    {
      name: "Withdrawal Report",
      route: "/dashboard/reports/withdrawal",
      children: <WithdrawalReport data={allData.allWithdrawalData} />,
    },
  ];

  return (
    <div className="mt-4 w-full">
      <Tab data={data} />
    </div>
  );
}
