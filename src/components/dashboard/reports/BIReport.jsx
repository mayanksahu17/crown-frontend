import { reportsBIColumns } from "../../../constants/Column";
import Table from "../global/Table";

export default function ({ data }) {
  const formattedData = data?.map((el, index) => ({ ...el, id: index + 1 }));
  
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
      Header: "AMOUNT",
      accessor: "amount",
      Cell: ({ value }) => <span className="text-green-400">${value}</span>,
    },
    {
      Header: "PERCENTAGE",
      accessor: "percentage",
      Cell: ({ value }) => <span>{value}%</span>,
    },
    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-md text-xs ${
          value?.toLowerCase() === "completed" ? "bg-green-900 text-green-400" :
          value?.toLowerCase() === "pending" ? "bg-blue-900 text-blue-400" :
          "bg-red-900 text-red-400"
        }`}>
          {value}
        </span>
      ),
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
