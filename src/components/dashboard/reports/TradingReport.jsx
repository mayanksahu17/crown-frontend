import { useEffect, useState } from "react";
import Table from "../global/Table";
import reportService from "../../../services/reportService";
import toast from "react-hot-toast";

const TradingReport = () => {
  const columns = [
    { accessor: "TradeDate", Header: "Trade Date" },
    { accessor: "Pair", Header: "Pair" },
    { accessor: "BuyingPrice", Header: "Buying Price ($)", prepend: "$" },
    { accessor: "OpenPrice", Header: "Open Price ($)", prepend: "$" },
    { accessor: "HighPrice", Header: "High Price ($)", prepend: "$" },
    { accessor: "LowPrice", Header: "Low Price ($)", prepend: "$" },
    { accessor: "Volume", Header: "Volume" },
    { accessor: "ProfitLoss", Header: "Profit / Loss", prepend: "$" },
    { accessor: "ProfitPercent", Header: "Profit (%)", append: "%" },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchEIReport = async () => {
      try {
        const response = await reportService.getTradeReport();
        //console.log(response);
        console.log(response);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wromg");
      } finally {
      }
    };
    fetchEIReport();
  }, []);
  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
  }));
  return (
    <div className="w-full p-32">
      <h1 className="text-4xl text-center mb-2">Trade Report</h1>
      <Table columns={columns} data={formattedData} />
    </div>
  );
};
export default TradingReport;
