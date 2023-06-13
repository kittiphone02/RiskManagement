import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

// import {
//   ChevronDoubleLeftIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ChevronDoubleRightIcon,
// } from "@heroicons/react/outline";
import { HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronDoubleLeft

} from "react-icons/hi2";

import { Button, PageButton } from "../buttons/Button";
import { SortIcon, SortUpIcon, SortDownIcon } from "../icons/Icons";
import GlobalFilter from "../dropdowns/GlobalFilter";
import classNames from "../../utils/classname";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      // autoResetExpanded: false,
      // autoResetGroupBy: false,
      // autoResetSelectedRows: false,
      // autoResetSortBy: false,
      // autoResetFilters: false,
      // autoResetRowState: false
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  // Render the UI for your table
  return (
    <div className="relative font-lao">
      <div className="flex justify-between p-2">
        <div className="flex gap-x-2 items-baseline">
          <label className="text-sm">Items per page:</label>
          <select
            className="w-20 rounded-md border border-gray-300 py-1.5 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-300"
            value={state.pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:flex sm:flex-row-reverse sm:gap-x-2">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              column.Filter ? (
                <div className="mt-2 sm:mt-0" key={column.id}>
                  {column.render("Filter")}
                </div>
              ) : null
            )
          )}
        </div>
      </div>
      {/* table */}
      <div className="flex flex-col">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden border-b border-gray-200">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      // Add the sorting props to control sorting. For this example
                      // we can add them into the header props
                      <th
                        scope="col"
                        className="group px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        <div className="flex items-center justify-between">
                          {column.render("Header")}
                          {/* Add a sort direction indicator */}
                          <p>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <SortDownIcon className="w-4 h-4 text-gray-400" />
                              ) : (
                                <SortUpIcon className="w-4 h-4 text-gray-400" />
                              )
                            ) : (
                              <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                            )}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {page.map((row) => {
                  // new
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap"
                            role="cell"
                          >
                            {cell.column.Cell.name === "defaultRenderer" ? (
                              <div className="text-sm text-gray-500">
                                {cell.render("Cell")}
                              </div>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-1 px-2 flex items-center justify-between bg-gray-50">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <p className="text-sm text-gray-700">
              show <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>{" "}
              {pageOptions.length > 1 ? "pages" : "page"}
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className={classNames(
                  !canPreviousPage ? "bg-gray-100 cursor-default" : "",
                  "rounded-l-md"
                )}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <HiOutlineChevronDoubleLeft className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                className={classNames(
                  !canPreviousPage ? "bg-gray-100 cursor-default" : ""
                )}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <HiOutlineChevronLeft className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                className={classNames(
                  !canNextPage ? "bg-gray-100 cursor-default" : ""
                )}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <span className="sr-only">Next</span>
                <HiOutlineChevronRight className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                className={classNames(
                  !canNextPage ? "bg-gray-100 cursor-default" : "",
                  "rounded-r-md"
                )}
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <HiOutlineChevronDoubleRight
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
