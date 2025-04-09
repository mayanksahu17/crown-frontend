import countryList from "react-select-country-list";
import { Select, Table } from "../..";
import { genealogyColumns } from "../../../constants/Column";
import { useMemo, useState } from "react";

export default function Referral({ data }) {
  const [submitClicked, setSubmitClicked] = useState(false);

  const [allFilters, setAllFilters] = useState({
    userCountry: null,
    userId: "",
    userEmailVerification: null,
  });

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
    <div>
      {/* Search Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search User's ID
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Search User's ID"
            value={allFilters.userId}
            onChange={(e) => handleAllFiltersChange("userId", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search User's Country
          </label>
          <Select
            options={options}
            value={allFilters.userCountry}
            onChange={(value) => {
              handleAllFiltersChange("userCountry", value);
            }}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search User's Email Verification
          </label>
          <Select
            options={[
              { label: "Verified", value: 1 },
              { label: "Not Verified", value: 0 },
            ]}
            value={allFilters.userEmailVerification}
            onChange={(value) =>
              handleAllFiltersChange("userEmailVerification", value)
            }
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mb-6 max-w-xs">
        <button 
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Submit
        </button>
        <button 
          onClick={() => {
            setSubmitClicked(false);
            setAllFilters({
              userCountry: null,
              userId: "",
              userEmailVerification: null,
            });
          }}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Referral Details Table */}
      <div>
        <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">
          Referral Details
        </h4>
        <div className="overflow-x-auto">
          <Table
            columns={genealogyColumns}
            data={submitClicked ? filteredData : formattedData}
            heading=""
          />
        </div>
        {formattedData?.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {submitClicked ? filteredData.length : formattedData.length} results
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
