import { useEffect, useMemo, useState } from "react";
import { BeginImage, GrowImage, ThriveImage } from "../../../assets";
import Modal from "../global/Modal";
import { IoClose } from "react-icons/io5";
import Button from "../global/Button";
import { Formik, ErrorMessage } from "formik";
import PreviewModal from "../global/PreviewModal";
import { calculateCompoundedAmount } from "../../../utils/calculateCompoundedAmount";
import { Select } from "../..";
import toast from "react-hot-toast";
import vouchersService from "../../../services/vouchersService";
import { useAuth } from "../../../hooks/useAuth";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../constants/tokens";
import investmentService from "../../../services/investmentService";

export default function Investment({ data }) {
  const handleNavigate = useNavigate();
  const { user } = useAuth();
  const packageData = [
    {
      name: "Beginner",
      image: BeginImage,
      minAmount: 25,
      maxAmount: 2499,
      description: "Get started with our entry-level investment package.",
      dailyReturns: "1.5%",
      durationInDays: 150,
      id: 1,
    },
    {
      name: "Grow",
      image: GrowImage,
      minAmount: 2500,
      maxAmount: 19999,
      description:
        "Experience steady growth with our mid-tier investment package.",
      dailyReturns: "1.8%",
      durationInDays: 140,
      id: 2,
    },
    {
      name: "Banker",
      image: ThriveImage,
      minAmount: 20000,
      maxAmount: 50000,
      description:
        "Take your investments to the next level with our professional package.",
      dailyReturns: "2.1%",
      durationInDays: 130,
      id: 3,
    },
  ];

  const [allData, setAllData] = useState({
    amount: 0,
    isOpenModal: false,
    selectedModalPackage: null,
    // isTokenClicked: false,
    // tokenWalletAmount: 0,
    // depositWalletAmount: 0,
    isVoucherClicked: false,
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
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "1px",
      fontWeight: "400",
    }),
    options: (provided) => ({
      ...provided,
      fontWeight: "400",
    }),
  };

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

  const selectedVoucherAmount = useMemo(() => {
    let amount = 0;
    if (
      allData.allVouchers.length > 0 &&
      allData.selectedVoucher &&
      allData.amount
    ) {
      const voucherAmount =
        allData.allVouchers.find(
          (el) => el.voucher_id == allData.selectedVoucher?.value
        )?.amount *
          (1 / 2) || 0;

      const halfAmount = allData.amount * (1 / 2);

      amount =
        voucherAmount < halfAmount
          ? voucherAmount
          : parseFloat(allData.amount) - parseFloat(halfAmount);
    }
    return amount;
  }, [allData.selectedVoucher, allData.allVouchers, allData.amount]);

  const totalPayableAmount = useMemo(() => {
    let amount = 0;
    if (allData.amount && allData.amount >= selectedVoucherAmount) {
      amount = parseFloat(allData.amount - parseFloat(selectedVoucherAmount));
    } else if (allData.amount && allData.amount <= selectedVoucherAmount) {
      amount = allData.amount * (1 / 2);
    } else {
      amount = allData.amount;
    }
    return amount;
  }, [allData.amount, selectedVoucherAmount]);

  const handleCreateInvestment = async () => {
    let custom = [];
    custom[0] = allData.downlineId ? allData.downlineId : user?.user?.userId;
    custom[1] = allData.packageType.value;
    custom[2] = user?.user?.userId;
    custom[3] = allData.selectedModalPackage?.id;
    custom[4] = parseInt(allData.amount);
    custom[5] = totalPayableAmount;
    custom[6] = selectedVoucherAmount;
    custom[7] = allData.selectedVoucher ? allData.selectedVoucher?.value : "NA";

    try {
      const data = {
        to_currency: allData.selectedToken?.value,
        amount: parseInt(totalPayableAmount),
        buyer_name: user?.user?.name,
        buyer_email: user?.user?.email,
        custom: JSON.stringify(custom),
      };

      const res = await investmentService.createInvestment(user, data);
      if (res.status === 200) {
        const checkoutUrl = res?.data?.data.checkout_url;
        setAllData({
          amount: 0,
          isOpenModal: false,
          selectedModalPackage: null,
          isVoucherClicked: false,
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
        });
        if (checkoutUrl) {
          window.open(checkoutUrl, "_blank");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* Preview Investment Modal */}
      <PreviewModal
        isOpen={allData.isPreviewModalOpen}
        handleClose={() => handleDataChange("isPreviewModalOpen", false)}
      >
        <div className="mt-3 grid grid-cols-2 justify-between w-full gap-4">
          <div className="w-full">
            <label className="block text-[#07153D] font-normal">
              Package Type
            </label>
            <input
              type="text"
              name="amount"
              className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
              readOnly
              value={allData?.packageType?.label}
            />
          </div>
          <div className="w-full">
            <label className="block text-[#07153D] font-normal">
              Package Name
            </label>
            <input
              type="text"
              name="amount"
              className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
              readOnly
              value={allData?.selectedModalPackage?.name}
            />
          </div>
          <div className="w-full">
            <label className="block text-[#07153D] font-normal">
              Daily Returns
            </label>
            <input
              type="text"
              name="amount"
              className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
              readOnly
              value={allData?.selectedModalPackage?.dailyReturns}
            />
          </div>
          <div className="w-full">
            <label className="block text-[#07153D] font-normal">
              Package Duration
            </label>
            <input
              type="text"
              name="amount"
              className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
              readOnly
              value={`${allData?.selectedModalPackage?.durationInDays} Days`}
            />
          </div>
          <div className="w-full">
            <label className="block text-[#07153D] font-normal">
              Amount to Pay
            </label>
            <input
              type="text"
              name="amount"
              className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
              readOnly
              value={allData?.amount}
            />
          </div>
          <div className="w-full">
            <label className="block text-[#07153D] font-normal">Earnings</label>
            <input
              type="text"
              name="amount"
              className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
              readOnly
              value={`$${calculateCompoundedAmount(
                parseInt(allData?.amount),
                allData?.selectedModalPackage?.dailyReturns,
                allData?.selectedModalPackage?.durationInDays
              )}`}
            />
          </div>
        </div>
        <Button className="mt-4 mb-1">Complete Transaction</Button>
      </PreviewModal>

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
          });
        }}
      >
        <Formik
          initialValues={{
            amount: "",
            downlineId: "",
          }}
          // validate={(values) => {
          //   let errors = {};
          //   if (!values.amount.trim()) {
          //     errors.amount = "Amount is required";
          //   } else if (!/^\d+$/.test(values.amount.trim())) {
          //     errors.amount = "Please enter a valid number";
          //   } else if (
          //     values.amount < allData?.selectedModalPackage?.minAmount ||
          //     values.amount > allData?.selectedModalPackage?.maxAmount
          //   ) {
          //     errors.amount = `Please enter an amount between $${allData?.selectedModalPackage?.minAmount} and $${allData?.selectedModalPackage?.maxAmount}`;
          //   }

          //   if (
          //     !values.downlineId.trim() &&
          //     allData.packageType.value === "downline"
          //   ) {
          //     errors.downlineId = "Downline ID is required";
          //   }

          //   return errors;
          // }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            // if (
            //   allData.isTokenClicked &&
            //   allData.depositWalletAmount > data.depositWalletAmount
            // ) {
            //   setErrors({ amount: "Insufficient balance in deposit wallet" });
            //   setSubmitting(false);
            // } else if (
            //   parseInt(values.amount) > data.depositWalletAmount &&
            //   !allData.isTokenClicked
            // ) {
            //   setErrors({ amount: "Insufficient balance in deposit wallet" });
            //   setSubmitting(false);
            // } else {
            //   handleDataChange("isOpenModal", false);
            //   handleDataChange("isPreviewModalOpen", true);
            // }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-end">
                <IoClose
                  size="20"
                  className="text-gray-600 cursor-pointer"
                  onClick={() => {
                    handleDataChange("isOpenModal", false);
                    handleDataChange("isTokenClicked", false);
                  }}
                />
              </div>
              <div className="w-full">
                <p className="text-2xl text-gray-700 font-semibold leading-tighter">
                  {allData?.selectedModalPackage?.name} Package
                </p>
                <p>{allData?.selectedModalPackage?.description}</p>
              </div>

              <div className="w-full mt-4">
                <label className="block text-[#07153D] font-normal">
                  Select Package Type
                </label>
                <Select
                  options={[
                    {
                      label: "Self",
                      value: "self",
                    },
                    {
                      label: "Downline",
                      value: "downline",
                    },
                  ]}
                  customStyles={customStyles}
                  value={allData.packageType}
                  onChange={(value) => handleDataChange("packageType", value)}
                />
              </div>
              <div className="w-full mt-4">
                <label className="block text-[#07153D] font-normal">
                  Select Cryptocurrency
                </label>
                <Select
                  options={tokens}
                  customStyles={customStyles}
                  value={allData.selectedToken}
                  onChange={(value) => handleDataChange("selectedToken", value)}
                />
              </div>

              {allData.packageType?.value === "downline" && (
                <>
                  <div className="w-full mt-4">
                    <label className="block text-[#07153D] font-normal">
                      Enter Downline ID
                    </label>
                    <input
                      type="text"
                      name="downlineId"
                      className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                      onChange={(e) => {
                        handleChange(e);
                        handleDataChange("downlineId", e.target.value);
                      }}
                      value={allData.downlineId}
                    />
                  </div>
                  <ErrorMessage name="downlineId">
                    {(message) => (
                      <p className="text-xs mt-1 text-red-600 font-normal">
                        {message}
                      </p>
                    )}
                  </ErrorMessage>
                </>
              )}

              <div className="w-full mt-4">
                <label className="block text-[#07153D] font-normal">
                  Add Amount
                </label>
                <input
                  type="text"
                  className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                  placeholder={`$${allData?.selectedModalPackage?.minAmount} - $${allData?.selectedModalPackage?.maxAmount}`}
                  onChange={(e) => {
                    handleDataChange("amount", e.target.value);
                  }}
                  value={allData.amount}
                />
              </div>

              <ErrorMessage name="amount">
                {(message) => (
                  <p className="text-xs mt-1 text-red-600 font-normal">
                    {message}
                  </p>
                )}
              </ErrorMessage>

              {/* {allData?.isTokenClicked && (
                <>
                  <div className="w-full mt-4">
                    <label className="block text-[#07153D] font-normal">
                      Amount from Token wallet (MAX: ${data.totalTokenAmount})
                    </label>
                    <input
                      type="text"
                      name="amount"
                      className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                      readOnly
                      value={allData.tokenWalletAmount}
                    />
                  </div>
                  <div className="w-full mt-4">
                    <label className="block text-[#07153D] font-normal">
                      Amount from Deposit wallet (MAX: $
                      {data.depositWalletAmount})
                    </label>
                    <input
                      type="text"
                      name="amount"
                      className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                      readOnly
                      value={allData.depositWalletAmount}
                    />
                  </div>
                </>
              )} */}

              {allData.isVoucherClicked && (
                <>
                  {allData.selectedVoucher && (
                    <>
                      <div>
                        <label className="block text-[#07153D] font-normal mt-4">
                          Net Payable Amount
                        </label>
                        <input
                          type="text"
                          name="amount"
                          className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                          readOnly
                          value={totalPayableAmount}
                        />
                      </div>
                      <div>
                        <label className="block text-[#07153D] font-normal mt-4">
                          Voucher Amount
                        </label>
                        <input
                          type="text"
                          name="amount"
                          className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                          readOnly
                          value={selectedVoucherAmount}
                        />
                        <p className="text-sm mt-1 text-black ">
                          <span className="text-red-600">*</span>You can only
                          use 50% of Voucher
                        </p>
                      </div>
                    </>
                  )}
                  <div className="w-full mt-4">
                    <label className="block text-[#07153D] font-normal">
                      Select Voucher
                    </label>
                    <Select
                      options={allData.allVouchers.map((el) => ({
                        label: `${el?.voucher_id} - $${el.amount} - ${moment(
                          el.created_on
                        ).format("D MMM YYYY")}`,
                        value: el?.voucher_id,
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

              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  className="w-3 h-3 cursor-pointer"
                  onClick={() =>
                    handleDataChange(
                      "isVoucherClicked",
                      !allData.isVoucherClicked
                    )
                  }
                  checked={allData.isVoucherClicked}
                />
                <p className="text-sm">Use Voucher</p>
              </div>

              <Button
                className="mt-3"
                type="submit"
                // disabled={!isValid}
                loading={allData.isInvestmentSubmitting}
                onClick={handleCreateInvestment}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
      <div className="mt-10 flex w-full justify-center mb-20 sm:mb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-4 w-full max-w-full lg:max-w-[80%]">
          {packageData.map((el, index) => (
            <div key={index} className="w-full h-[80%]">
              <img
                src={el?.image}
                alt="Package Image"
                className="h-full w-full "
              />
              <Button
                className=" !py-1 !h-10 !flex !items-center !justify-center rounded-md w-full mt-2 text-white font-normal "
                disabled={true}
                // onClick={() => {
                //   handleDataChange("isOpenModal", true);
                //   handleDataChange("selectedModalPackage", el);
                // }}
              >
                Purchase
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
