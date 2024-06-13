import { packageActivationColumns } from "../../../constants/columns";
import Table from "../global/Table";

export default function PackageActivation({ data }) {
  const formattedData = data.map((el, index) => ({
    ...el,
    id: index + 1,
    package: el?.package_name,
    days: el?.duration,
    invested: parseFloat(el?.invested_amount)?.toFixed(2),
    investmentDate: el?.investment_date,
    expiry: el?.expires_on,
    token: parseFloat(el?.token_amount || 0).toFixed(2),
  }));
  console.log(data);
  return (
    <div className="mt-4">
      <Table columns={packageActivationColumns} data={formattedData} />
    </div>
  );
}
