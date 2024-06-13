import React from "react";
import clsx from "clsx";
import { useTable, usePagination } from "react-table";
import ReactPaginate from "react-paginate";

export default function Table({ className, columns, data, heading }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  return (
    <div className="w-full overflow-x-auto">
      {heading && (
        <h1 className="mb-2 text-xl font-normal text-[#07153D]">{heading}</h1>
      )}
      <table
        className={clsx(
          "table-auto w-full border border-solid border-slate-200",
          className
        )}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((el) => (
            <tr
              {...el.getHeaderGroupProps()}
              className="bg-textred text-white"
              key={el.id}
            >
              {el.headers.map((currElem) => (
                <th
                  {...currElem.getHeaderProps()}
                  className="py-2 px-4 font-normal uppercase sm:py-3 sm:px-6 md:py-4 md:px-8"
                  key={currElem.id}
                >
                  {currElem.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="w-full">
          {!(data?.length < 1) ? (
            page.map((el) => {
              prepareRow(el);
              return (
                <tr
                  {...el.getRowProps()}
                  className="border-b border-slate-200"
                  key={el.id}
                >
                  {el.cells.map((currElem) => (
                    <td
                      {...currElem.getCellProps()}
                      className="py-2 px-4 font-normal sm:py-3 sm:px-6 md:py-4 md:px-8"
                      key={currElem.id}
                    >
                      {currElem.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr className="border-b border-slate-200 ">
              <td className="py-2 px-4 font-normal sm:py-3 sm:px-6 md:py-4 md:px-8 ">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between w-full border-t border-gray-200 bg-textred px-4 mt-4 py-2 text-white">
        <div className="text-sm ">
          Showing{" "}
          <span className="font-medium">
            {pageIndex * 10 + 1}-{Math.min((pageIndex + 1) * 10, data.length)}
          </span>{" "}
          of <span className="font-medium">{data.length}</span> results
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => gotoPage(data.selected)}
          containerClassName={"flex !text-sm"}
          subContainerClassName={"px-3 py-1.5 text-white"}
          activeClassName={"bg-white text-[#07153D] rounded-md"}
          pageClassName={"text-white py-1.5"}
          pageLinkClassName={"px-3 py-1.5"}
          previousClassName={"px-3 py-1.5"}
          nextClassName={"px-3 py-1.5"}
          previousLinkClassName={""}
          nextLinkClassName={""}
        />
      </div>
    </div>
  );
}
