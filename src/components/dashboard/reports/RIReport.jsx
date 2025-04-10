import { reportsRIColumns } from "../../../constants/Column";
import Table from "../global/Table";

export default function ({ data }) {
  const packages = [
    {
      name: "BEGINNER",
      id: 1,
    },
    {
      name: "GROW",
      id: 2,
    },
    {
      name: "BANKER",
      id: 3,
    },
  ];

  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    referralUser: el?.referral_user_id,
    referralAmount: el?.amount,
    package: packages.find((currElem) => currElem.id === el?.package_id)?.name,
  }));
  
  // Custom columns with styling matching the screenshot
  const customColumns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "DATE",
      accessor: "date",
    },
    {
      Header: "REFERRAL USER",
      accessor: "referralUser",
    },
    {
      Header: "POSITION",
      accessor: "position",
    },
    {
      Header: "PACKAGE",
      accessor: "package",
    },
    {
      Header: "REFERRAL AMOUNT",
      accessor: "referralAmount",
      Cell: ({ value }) => <span className="text-green-600 dark:text-green-400 font-medium">${value}</span>,
    },
  ];
  
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {customColumns.map((column) => (
                <th 
                  key={column.Header} 
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-[#1E293B]"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#1E293B]">
            {formattedData && formattedData.length > 0 ? (
              formattedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {customColumns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300"
                    >
                      {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={customColumns.length} 
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1E293B]"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
