import { downlineActivationColumns } from "../../../constants/columns";
import Table from "../global/Table";

export default function DownlineActivation({ data }) {
  console.log(data);
  const formattedData = data.map((el, index) => ({
    ...el,
    id: index + 1,
    user: el?.user_id,
    package: el?.package_name,
    days: el?.duration,
    invested: parseFloat(el?.deposit_amount || 0).toFixed(2),
    investmentDate: el?.investment_date,
    expiry: el?.expires_on,
    token: parseFloat(el?.token_amount || 0)?.toFixed(2),
  }));

  return (
    <div className="mt-4">
      <Table columns={downlineActivationColumns} data={formattedData} />
    </div>
  );
}
