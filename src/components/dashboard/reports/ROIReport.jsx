import { reportsROIColumns } from "../../../constants/Column";
import Table from "../global/Table";

export default function ({ data }) {
  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    package: el?.package_name,
    percentage: el?.investment?.package?.roi,
    investedAmount: el?.invested_amount,
    expiryDate: el?.expires_on,
    roi: el?.roi,
  }));
  return (
    <div className="h-full w-full mt-4">
      <Table
        columns={reportsROIColumns}
        data={formattedData}
        heading="ROI Report"
      />
    </div>
  );
}
