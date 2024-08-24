import Card from "./Card";
import CrownCard from "./CrownCard";
import UpdateWalletAddressModal from "./UpdateWalletAddressModal";

export default function HomeStats({
  selectedWallet,
  setSelectedWallet,
  cardsData,
}) {
  return (
    <div className="flex flex-col items-center md:items-start w-full h-full md:min-h-screen px-4">
      <div className="flex flex-col w-full space-y-4 ">
        <img src="assets/img/cc.png" className="" />
        <div className="space-y-2 px-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Your Balance</span>
            <span className="text-2xl font-bold">$128,320</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-500">+23.12%</span>
            <span className="text-red-500">-23.12%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Currency</span>
            <span className="font-medium">USDT/US Dollar</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span className="font-medium">Active</span>
          </div>
        </div>
      </div>
      <UpdateWalletAddressModal />
    </div>
  );
}
