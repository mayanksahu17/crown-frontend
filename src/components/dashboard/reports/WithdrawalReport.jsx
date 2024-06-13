import { reportWithdrawalColumns } from "../../../constants/columns";
import Table from "../global/Table";

export default function ({ data }) {
  console.log(data);

  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    cryptoType: el?.crypto_type,
    walletType: el?.wallet_type,
    finalAmount: el?.final_amount
      ? parseFloat(el?.final_amount).toFixed(2)
      : parseFloat(0)?.toFixed(2),
    charges: el?.charges
      ? parseFloat(el?.charges)?.toFixed(2)
      : parseFloat(0)?.toFixed(2),
  }));

  return (
    <div className="w-full mt-4">
      <Table
        columns={reportWithdrawalColumns}
        data={formattedData}
        heading="Withdrawal Report"
      />
    </div>
  );
}
