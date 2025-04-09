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
      Cell: ({ value }) => <span className="text-green-400">${value}</span>,
    },
  ];
  
  return (
    <div className="h-full w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full text-gray-400">
          <thead className="border-b border-gray-700">
            <tr>
              {customColumns.map((column) => (
                <th key={column.Header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {formattedData && formattedData.length > 0 ? (
              formattedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-800">
                  {customColumns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={customColumns.length} className="px-6 py-4 text-center text-gray-500">
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
