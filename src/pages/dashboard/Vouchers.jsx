import { AllVouchers, CreateVoucher, Tab } from "../../components";

export default function Vouchers() {
  const data = [
    {
      name: "Create Voucher",
      route: "/dashboard/vouchers/create",
      children: <CreateVoucher />,
    },
    {
      name: "Vouchers List",
      route: "/dashboard/vouchers/all",
      children: <AllVouchers />,
    },
  ];
  return (
    <div className="mt-4 w-full">
      <Tab data={data} />
    </div>
  );
}
