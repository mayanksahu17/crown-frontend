import { useEffect, useState } from "react";
import { Tab, BinaryTree, Referral } from "../../Components";
import { useAuth } from "../../hooks/useAuth";
import genealogyService from "../../services/genealogyService";

export default function Genealogy() {
  const { user } = useAuth();
  const [allData, setAllData] = useState({
    allBinaryData: [],
    allReferralData: [],
  });

  const handleAllDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [binaryTreeResponse, referralResponse] = await Promise.all([
          genealogyService.getBinaryTreeData(user),
          genealogyService.getReferralData(user),
        ]);

        if (binaryTreeResponse?.data?.success)
          handleAllDataChange("allBinaryData", binaryTreeResponse?.data?.data);

        if (referralResponse?.data?.success)
          handleAllDataChange("allReferralData", referralResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const data = [
    {
      name: "Referral",
      route: "/dashboard/genealogy/referral",
      children: <Referral data={allData.allReferralData} />,
    },
    {
      name: "Binary Tree",
      route: "/dashboard/genealogy/binary",
      children: <BinaryTree data={allData.allBinaryData} />,
    },
  ];

  return (
    <div className="w-full mt-4">
      <Tab data={data} />
    </div>
  );
}
