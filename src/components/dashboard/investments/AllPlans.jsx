import { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { IoClose } from "react-icons/io5";
import Button from "../global/Button";
import { Select } from "../..";
import toast from "react-hot-toast";
import vouchersService from "../../../services/vouchersService";
import { useAuth } from "../../../hooks/useAuth";
import moment from "moment/moment";
import { tokens } from "../../../constants/tokens";
import investmentService from "../../../services/investmentService";
import { customStyles, packageData } from "./data";
import axios from "axios";

export default function Investment({ data }) {
  const { user } = useAuth();

  const [allData, setAllData] = useState({
    amount: 0,
    isOpenModal: false,
    selectedModalPackage: null,
    deposit_amount: 0,
    voucher_amount: 0,
    isVoucherClicked: false,
    isDepositWalletClicked: false,
    isPreviewModalOpen: false,
    packageType: {
      label: "Self",
      value: "self",
    },
    allVouchers: [],
    selectedVoucher: null,
    downlineId: "",
    isInvestmentSubmitting: false,
    selectedToken: null,
    deposit_wallet: 0,
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  const createInvestment = (user, data) => {
    return axios.post(
      `https://crownbankers.com/api/payment/create_transaction`,
      {
        ...data,
        email: user?.user?.email,
      },
      {
        headers: {
          Authorization: user?.token,
        },
      }
    );
  };

  // Fetch deposit wallet balance
  useEffect(() => {
    (async () => {
      try {
        // Replace with actual API call to get user's deposit wallet balance
        const userDataResponse = await axios.get(
          `https://crownbankers.com/api/dashboard/all_data`,
          {
            headers: {
              Authorization: user?.token,
            },
          }
        );
        
        if (userDataResponse.status === 200) {
          const depositWallet = userDataResponse?.data?.data?.deposit_wallet || 0;
          handleDataChange("deposit_wallet", depositWallet);
        }
      } catch (error) {
        console.error("Error fetching deposit wallet:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await vouchersService.getAllActiveVouchers(user);
        if (res.status === 200) {
          handleDataChange("allVouchers", res?.data?.data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    })();
  }, []);

  const handleCreateInvestment = async () => {
    let custom = [];
    custom[0] = allData.downlineId ? allData.downlineId : user?.user?.userId;
    custom[1] = allData.packageType.value;
    custom[2] = user?.user?.userId;
    custom[3] = allData.selectedModalPackage?.id;
    custom[4] = parseFloat(allData.amount);
    custom[5] = parseFloat(allData.deposit_amount);
    custom[6] = parseFloat(allData.voucher_amount);
    custom[7] = allData.selectedVoucher ? allData.selectedVoucher?.value : "NA";
    custom[8] = allData.isDepositWalletClicked ? "1" : "0"; // Flag to indicate deposit wallet usage

    try {
      // If using deposit wallet funds
      if (allData.isDepositWalletClicked) {
        handleDataChange("isInvestmentSubmitting", true);
        
        // Call API endpoint to activate package using deposit wallet
        const activateResponse = await investmentService.activatePackageFromDepositWallet({
          user_id: user?.user?.userId,
          package_id: allData.selectedModalPackage?.id,
          amount: parseFloat(allData.amount),
          deposit_amount: parseFloat(allData.deposit_amount),
          voucher_amount: parseFloat(allData.voucher_amount),
          voucher_id: allData.selectedVoucher ? allData.selectedVoucher?.value : "NA",
          package_type: allData.packageType.value,
          downline_id: allData.downlineId ? allData.downlineId : user?.user?.userId,
        });
        
        if (activateResponse?.data?.success) {
          toast.success("Package activated successfully!");
          setAllData({
            amount: 0,
            isOpenModal: false,
            deposit_amount: 0,
            voucher_amount: 0,
            selectedModalPackage: null,
            isVoucherClicked: false,
            isDepositWalletClicked: false,
            isPreviewModalOpen: false,
            packageType: {
              label: "Self",
              value: "self",
            },
            allVouchers: [],
            selectedVoucher: null,
            downlineId: "",
            isInvestmentSubmitting: false,
            selectedToken: null,
            deposit_wallet: allData.deposit_wallet,
          });
        } else {
          toast.error(activateResponse?.data?.message || "Failed to activate package");
        }
      } else {
        // Regular crypto payment flow
        const data = {
          to_currency: allData.selectedToken?.value,
          amount: parseFloat(allData.deposit_amount),
          buyer_name: user?.user?.name,
          buyer_email: user?.user?.email,
          custom: JSON.stringify(custom),
        };
        
        const res = await createInvestment(user, data);
        if (res.status === 200) {
          const checkoutUrl = res?.data?.data.checkout_url;
          setAllData({
            amount: 0,
            isOpenModal: false,
            deposit_amount: 0,
            voucher_amount: 0,
            selectedModalPackage: null,
            isVoucherClicked: false,
            isDepositWalletClicked: false,
            isPreviewModalOpen: false,
            packageType: {
              label: "Self",
              value: "self",
            },
            allVouchers: [],
            selectedVoucher: null,
            downlineId: "",
            isInvestmentSubmitting: false,
            selectedToken: null,
            deposit_wallet: allData.deposit_wallet,
          });
          if (checkoutUrl) {
            window.open(checkoutUrl, "_blank");
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      handleDataChange("isInvestmentSubmitting", false);
    }
  };

  return (
    <>
      {/* Investment Modal */}
      <Modal
        isOpen={allData.isOpenModal}
        handleClose={() => {
          handleDataChange("isOpenModal", false);
          setAllData({
            amount: 0,
            isOpenModal: false,
            selectedModalPackage: null,
            isVoucherClicked: false,
            isDepositWalletClicked: false,
            isPreviewModalOpen: false,
            packageType: {
              label: "Self",
              value: "self",
            },
            allVouchers: [],
            selectedVoucher: null,
            downlineId: "",
            isInvestmentSubmitting: false,
            selectedToken: null,
            deposit_wallet: allData.deposit_wallet,
          });
        }}
      >
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-md shadow-lg">
          <div className="flex items-center justify-end">
            <IoClose
              size="20"
              className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={() => {
                handleDataChange("isOpenModal", false);
              }}
            />
          </div>

          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {allData?.selectedModalPackage?.name} Package
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {allData?.selectedModalPackage?.description}
          </p>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Select Package Type</label>
            <Select
              options={[
                { label: "Self", value: "self" },
                { label: "Downline", value: "downline" },
              ]}
              customStyles={customStyles}
              value={allData.packageType}
              onChange={(value) => handleDataChange("packageType", value)}
            />
          </div>

          {!allData.isDepositWalletClicked && (
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Select Cryptocurrency</label>
              <Select
                options={tokens}
                customStyles={customStyles}
                value={allData.selectedToken}
                onChange={(value) => handleDataChange("selectedToken", value)}
              />
            </div>
          )}

          {allData.packageType?.value === "downline" && (
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Enter Downline ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                          placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2
                          focus:ring-blue-500 focus:border-transparent outline-none"
                onChange={(e) =>
                  handleDataChange("downlineId", e.target.value)
                }
                value={allData.downlineId}
              />
            </div>
          )}

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Investment Amount</label>
            <input
              type="text"
              placeholder={`$${allData?.selectedModalPackage?.minAmount} - $${allData?.selectedModalPackage?.maxAmount}`}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                        placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2
                        focus:ring-blue-500 focus:border-transparent outline-none"
              onChange={(e) => {
                const enteredValue = parseFloat(e.target.value);
                handleDataChange("amount", e.target.value);
                if (allData?.isVoucherClicked) {
                  const voucherAmount = enteredValue * 0.5;
                  handleDataChange("deposit_amount", voucherAmount);
                  handleDataChange("voucher_amount", voucherAmount);
                } else {
                  handleDataChange("deposit_amount", e.target.value);
                  handleDataChange("voucher_amount", 0);
                }
              }}
              value={allData.amount}
            />
          </div>

          {/* Deposit Wallet Option */}
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="checkbox"
              id="useDepositWallet"
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              checked={allData.isDepositWalletClicked}
              onChange={() => {
                const newValue = !allData.isDepositWalletClicked;
                handleDataChange("isDepositWalletClicked", newValue);
                if (newValue) {
                  // When enabling deposit wallet, disable voucher and crypto options
                  handleDataChange("isVoucherClicked", false);
                  handleDataChange("deposit_amount", allData.amount);
                  handleDataChange("voucher_amount", 0);
                  handleDataChange("selectedToken", null);
                }
              }}
            />
            <label htmlFor="useDepositWallet" className="text-gray-700 dark:text-gray-300">
              Use Deposit Wallet (Balance: ${parseFloat(allData.deposit_wallet).toFixed(2)})
            </label>
          </div>

          {!allData.isDepositWalletClicked && (
            <div className="flex items-center mt-4 space-x-2">
              <input
                type="checkbox"
                id="useVoucher"
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                checked={allData.isVoucherClicked}
                onChange={() => {
                  const newValue = !allData.isVoucherClicked;
                  handleDataChange("isVoucherClicked", newValue);
                  if (newValue) {
                    const voucherAmount = parseFloat(allData.amount) * 0.5;
                    handleDataChange("deposit_amount", voucherAmount);
                    handleDataChange("voucher_amount", voucherAmount);
                    handleDataChange("selectedVoucher", null);
                  } else {
                    handleDataChange("deposit_amount", parseFloat(allData.amount));
                    handleDataChange("voucher_amount", 0);
                    handleDataChange("selectedVoucher", { value: "NA" });
                  }
                }}
              />
              <label htmlFor="useVoucher" className="text-gray-700 dark:text-gray-300">Use Voucher</label>
            </div>
          )}

          {allData.isVoucherClicked && (
            <>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Deposit Amount</label>
                <input
                  readOnly
                  value={allData?.deposit_amount}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 
                            bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Voucher Amount</label>
                <input
                  readOnly
                  value={allData?.voucher_amount}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 
                            bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Select Voucher</label>
                <Select
                  options={allData.allVouchers.map((el) => ({
                    label: `${el?.voucher_id} - $${el.amount} - ${moment(
                      el.created_on
                    ).format("D MMM YYYY")}`,
                    value: el?.voucher_id,
                    amount: el?.amount,
                  }))}
                  customStyles={customStyles}
                  value={allData.selectedVoucher}
                  onChange={(value) =>
                    handleDataChange("selectedVoucher", value)
                  }
                />
              </div>
            </>
          )}

          <Button
            className="mt-6 w-full"
            loading={allData.isInvestmentSubmitting}
            onClick={handleCreateInvestment}
            disabled={
              !allData.amount || 
              (!allData.selectedToken && !allData.isDepositWalletClicked) ||
              (allData.isDepositWalletClicked && parseFloat(allData.amount) > parseFloat(allData.deposit_wallet)) ||
              (allData.isVoucherClicked && !allData.selectedVoucher)
            }
          >
            {allData.isDepositWalletClicked 
              ? "Activate Package" 
              : "Submit"
            }
          </Button>
          
          {allData.isDepositWalletClicked && parseFloat(allData.amount) > parseFloat(allData.deposit_wallet) && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-2">
              Insufficient balance in deposit wallet. Please deposit more funds or use cryptocurrency payment.
            </p>
          )}
        </div>
      </Modal>

      {/* Package Cards */}
      <div className="p-6">
        <div className="relative">
          {/* Single main package image */}
          <img
            src="/assets/img/price.png"
            alt="Investment Packages"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          
          {/* Individual buttons positioned exactly as in screenshot */}
          <div className="absolute inset-0">
            {/* Solar Starter Button */}
            <button
              onClick={() => {
                handleDataChange("isOpenModal", true);
                handleDataChange("selectedModalPackage", packageData[0]);
              }}
              className="absolute left-[16.5%] bottom-[6%] transform -translate-x-1/2 bg-[#42c977] hover:bg-[#37b569] text-white py-2.5 px-8 rounded-md font-medium transition-colors duration-200"
            >
              Purchase
            </button>
            
            {/* Power Growth Button */}
            <button
              onClick={() => {
                handleDataChange("isOpenModal", true);
                handleDataChange("selectedModalPackage", packageData[1]);
              }}
              className="absolute left-[50%] bottom-[6%] transform -translate-x-1/2 bg-[#42c977] hover:bg-[#37b569] text-white py-2.5 px-8 rounded-md font-medium transition-colors duration-200"
            >
              Purchase
            </button>
            
            {/* Elite Energy Button */}
            <button
              onClick={() => {
                handleDataChange("isOpenModal", true);
                handleDataChange("selectedModalPackage", packageData[2]);
              }}
              className="absolute left-[83.5%] bottom-[6%] transform -translate-x-1/2 bg-[#42c977] hover:bg-[#37b569] text-white py-2.5 px-8 rounded-md font-medium transition-colors duration-200"
            >
              Purchase
            </button>
          </div>
        </div>
        
        {/* Package names as in screenshot */}
        <div className="mt-8 flex justify-between px-16">
          <div className="text-center font-semibold text-lg text-gray-800 dark:text-white">
            Solar Starter
          </div>
          <div className="text-center font-semibold text-lg text-gray-800 dark:text-white">
            Power Growth
          </div>
          <div className="text-center font-semibold text-lg text-gray-800 dark:text-white">
            Elite Energy
          </div>
        </div>
      </div>
    </>
  );
}
