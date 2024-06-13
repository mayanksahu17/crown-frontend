import { reportsRIColumns } from "../../../constants/columns";
import Table from "../global/Table";

export default function ({ data }) {
  const packages = [
    {
      name: "BEGIN",
      id: 1,
    },
    {
      name: "GROW",
      id: 2,
    },
    {
      name: "THRIVE",
      id: 3,
    },
  ];

  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    referralUser: el?.referral_user_id,
    referralAmount: el?.amount,
    package: packages.find((currElem) => currElem.id === el?.package_id)?.name,
  }));
  return (
    <div className="w-full mt-4">
      <Table
        columns={reportsRIColumns}
        data={formattedData}
        heading="Referral Transactions"
      />
    </div>
  );
}
