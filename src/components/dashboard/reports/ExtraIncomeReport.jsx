import { reportsExtraIncomeColumns } from "../../../constants/columns";
import Table from "../global/Table";

export default function ({ data }) {
  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    rewardAmount: el?.reward_amount,
  }));
  return (
    <div className="w-full mt-4">
      <Table
        columns={reportsExtraIncomeColumns}
        data={formattedData}
        heading="Carrer Reward Transactions"
      />
    </div>
  );
}
