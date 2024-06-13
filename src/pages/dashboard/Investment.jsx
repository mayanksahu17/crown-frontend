import { useEffect, useState } from "react";
import {
  AllPlans,
  DownlineActivation,
  PackageActivation,
  Tab,
} from "../../Components";
import investmentService from "../../services/investmentService";
import { useAuth } from "../../hooks/useAuth";
import walletService from "../../services/walletService";

export default function Investment() {
  const { user } = useAuth();

  const [allData, setAllData] = useState({
    allDownlineData: [],
    allPackageData: [],
    totalTokenAmount: 0,
    depositWalletAmount: 0,
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [downlineResponse, packageResponse] = await Promise.all([
          investmentService.getDownlineReport(user),
          investmentService.getPackageReport(user),
        ]);

        if (downlineResponse?.data?.success)
          handleDataChange("allDownlineData", downlineResponse?.data?.data);

        // Uncomment the following block if needed
        if (packageResponse?.data?.success)
          handleDataChange("allPackageData", packageResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const data = [
    {
      name: "All Plans",
      route: "/dashboard/investments/all-plans",
      children: (
        <AllPlans
          data={{
            totalTokenAmount: allData.totalTokenAmount,
            depositWalletAmount: allData.depositWalletAmount,
          }}
        />
      ),
    },
    {
      name: "Package Activation",
      route: "/dashboard/investments/package-activation",
      children: <PackageActivation data={allData.allPackageData} />,
    },
    {
      name: "Downline Activation",
      route: "/dashboard/investments/downline-activation",
      children: <DownlineActivation data={allData.allDownlineData} />,
    },
  ];

  return (
    <>
      <div className="w-full mt-4">
        <Tab data={data} />
      </div>
    </>
  );
}
