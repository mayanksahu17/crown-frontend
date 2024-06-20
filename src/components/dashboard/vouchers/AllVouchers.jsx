import { useEffect, useMemo, useState } from "react";
import VoucherCard from "./VoucherCard";
import { useAuth } from "../../../hooks/useAuth";
import vouchersService from "../../../services/vouchersService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AllVouchers() {
  const { user } = useAuth();
  const [allData, setAllData] = useState({
    allVocuchers: [],
  });
  const handleNavigate = useNavigate();

  const handleAllDataChange = async (name, value) => {
    setAllData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await vouchersService.getAllVouchers(user);
        if (res.status === 200) {
          handleAllDataChange("allVocuchers", res?.data?.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    })();
  }, []);

  const formattedData = useMemo(
    () =>
      allData.allVocuchers.map((el) => ({
        amount: el?.amount,
        wallet: el?.from_wallet,
        createdAt: new Date(el?.created_on)?.toISOString(),
        voucher: el?.voucher_id,
      })),
    [allData.allVocuchers]
  );

  return (
    <div className="p-1 sm:p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
      {formattedData.length < 1 ? (
        <>
          <p className="mb-1">No Vouchers Found</p>
        </>
      ) : (
        formattedData?.map((el, index) => <VoucherCard key={index} {...el} />)
      )}
    </div>
  );
}
