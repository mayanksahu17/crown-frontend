import { useState } from "react";
import { reportsTokenColumns } from "../../../constants/Column";
import Table from "../global/Table";

export default TradingReport = () => {
  const [data, setData] = useState([]);

  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
  }));
  return (
    <div className="w-full mt-4">
      <Table
        columns={reportsTokenColumns}
        data={formattedData}
        heading="Trading Report"
      />
    </div>
  );
};
