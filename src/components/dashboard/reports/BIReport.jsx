import { reportsBIColumns } from "../../../constants/Column";
import Table from "../global/Table";

export default function ({ data }) {
  const formattedData = data?.map((el, index) => ({ ...el, id: index + 1 }));
  return (
    <div className="w-full mt-4">
      <Table
        columns={reportsBIColumns}
        data={formattedData}
        heading="BI Report"
      />
    </div>
  );
}
