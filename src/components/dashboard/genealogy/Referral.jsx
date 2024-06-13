import countryList from "react-select-country-list";
import { Select, Button, Table } from "../..";
import { genealogyColumns } from "../../../constants/columns";
import { useMemo, useState } from "react";

export default function Referral({ data }) {
  const [submitClicked, setSubmitClicked] = useState(false);

  const [allFilters, setAllFilters] = useState({
    userCountry: null,
    userId: "",
    userEmailVerification: null,
  });

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

  const handleAllFiltersChange = (name, value) =>
    setAllFilters((prev) => ({ ...prev, [name]: value }));

  const options = useMemo(() => countryList().getData(), []);

  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    user: el?.userData,
    countryAndPhone: {
      country: el?.userData?.country,
      phone: el?.userData?.phone,
    },
    position: el?.referral?.position,
    registeredOn: el?.referral?.registered_on,
    status: el?.userData?.verified,
    investment: el?.walletData?.[0]?.total_investment,
  }));

  const filteredData = formattedData?.filter((el) => {
    const countryMatch =
      !allFilters.userCountry ||
      el?.userData?.country === allFilters.userCountry.label;

    const emailVerificationMatch =
      !allFilters.userEmailVerification ||
      parseInt(el?.userData?.verified) ==
        parseInt(allFilters.userEmailVerification?.value);

    const userIdMatch =
      !allFilters.userId ||
      el?.userData?.userId
        ?.toLowerCase()
        ?.includes(allFilters?.userId?.toLowerCase());

    return countryMatch && emailVerificationMatch && userIdMatch;
  });

  const handleSubmit = () => {
    setSubmitClicked(true);
  };

  return (
    <div className="mt-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="w-full">
          <label className="block text-[#07153D] font-normal">
            Search User's ID
          </label>
          <input
            type="text"
            name="confirmEmail"
            className="w-full bg-white px-2.5 py-[7px] border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
            value={allFilters.userId}
            onChange={(e) => handleAllFiltersChange("userId", e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block text-[#07153D] font-normal mb-1">
            Search User's Country
          </label>
          <Select
            customStyles={customStyles}
            options={options}
            value={allFilters.userCountry}
            onChange={(value) => {
              handleAllFiltersChange("userCountry", value);
            }}
          />
        </div>
        {/* <div className="w-full">
          <label className="block text-[#07153D] font-normal mb-1">
            Search User's Status
          </label>
          <Select
            customStyles={customStyles}
            options={[
              { label: "Active", value: "active" },
              { label: "InActive", value: "inActive" },
            ]}
          />
        </div> */}
        <div className="w-full">
          <label className="block text-[#07153D] font-normal mb-1">
            Search User's Email Verification
          </label>
          <Select
            customStyles={customStyles}
            options={[
              { label: "Verified", value: 1 },
              { label: "Not Verified", value: 0 },
            ]}
            value={allFilters.userEmailVerification}
            onChange={(value) =>
              handleAllFiltersChange("userEmailVerification", value)
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-4 max-w-lg mt-4">
        <Button onClick={handleSubmit}>Submit</Button>
        <Button
          onClick={() => {
            setSubmitClicked(false);
            setAllFilters({
              userCountry: null,
              userId: "",
              userEmailVerification: null,
            });
          }}
        >
          Reset
        </Button>
      </div>

      <div className="mt-10">
        {submitClicked ? (
          <Table
            columns={genealogyColumns}
            data={filteredData}
            heading="Referral Details"
          />
        ) : (
          <Table
            columns={genealogyColumns}
            data={formattedData}
            heading="Referral Details"
          />
        )}
      </div>
    </div>
  );
}
