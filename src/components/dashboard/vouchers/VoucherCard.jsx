import clsx from "clsx";
import moment from "moment";
import { FaRegClock } from "react-icons/fa6";

export default function VoucherCard({ amount, createdAt, wallet, voucher }) {
  return (
    <div className={clsx("p-3 rounded-lg bg-black")}>
      <div className="flex w-full items-center justify-between">
        <p className="text-white">{voucher}</p>
        <h3 className="text-white font-medium text-2xl">${amount}</h3>
      </div>
      <div className="mt-6 h-1 bg-white w-full rounded-lg" />

      <div className="mt-2 flex items-center justify-between w-full">
        <p className="text-white font-normal uppercase">{wallet}</p>
        <div className="flex items-center space-x-2">
          <FaRegClock size="16" />
          <p className="text-white font-normal">
            {moment(createdAt).format("D MMM YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
}
