import { useTableStore } from "@/store/table-store";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

interface TableProps<TData, TValue> {
  className?: string;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}
export default function Table<TData, TValue>(props: TableProps<TData, TValue>) {
  const { className, data, columns } = props;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const { loading } = useTableStore();
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const currentCount = table.getPaginationRowModel().rows.length;

  const displayedSoFar = pageIndex * pageSize + currentCount;
  return (
    <div className={clsx("w-full", className)}>
      <div className="rounded-md overflow-hidden">
        <table className="w-full shadow-xl border-collapse">
          <thead className="space-x-1 rounded-lg">
            {table.getHeaderGroups().map((hGroup) => (
              <tr key={hGroup.id} className="">
                {hGroup.headers.map((header) => (
                  <th
                    className="font-bold border-r last:border-0 bg-orange-500 py-2 text-white border-black text-l"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-white font-semibold text-2xl bg-slate-900 text-center"
                >
                  <div className="w-full">
                    <PulseLoader color="white" />
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  className={clsx("text-white border-black", {
                    "bg-slate-900": i % 2 !== 0,
                    "bg-slate-800": i % 2 === 0,
                  })}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="ps-2 py-1 border-r last:border-0 text-center border-black"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-white font-semibold text-2xl bg-slate-900 text-center"
                >
                  No Results.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="font-bold border-r last:border-0 bg-orange-500 py-1 text-white border-black text-l"></td>
              <td className="font-bold border-r last:border-0 bg-orange-500 py-1 text-white border-black text-l"></td>
              <td className="font-bold border-r last:border-0 bg-orange-500 py-1 text-white border-black text-l"></td>
              <td className="font-bold border-r last:border-0 bg-orange-500 py-1 text-white border-black text-l"></td>
              <td className="font-bold border-r last:border-0 bg-orange-500 py-1 text-white border-black text-l"></td>
              <td className="font-bold text-center border-r last:border-0 bg-orange-500 py-1 text-white border-black text-l">
                Total
              </td>
              <td className="font-bold border-r text-center last:border-0 bg-orange-500 py-1 text-white border-black text-l">
                {loading ? null : (
                  <span>
                    {displayedSoFar} of{" "}
                    {table.getCoreRowModel().rows.length}
                  </span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-1 py-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={clsx(
            "text-white shadow-xl px-2 py-1 rounded-lg font-semibold",
            {
              "bg-gray-500 cursor-not-allowed": !table.getCanPreviousPage(),
              "bg-orange-500 cursor-pointer": table.getCanPreviousPage(),
            }
          )}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={clsx("px-2 py-1 rounded-lg font-semibold", {
            "bg-gray-500 cursor-not-allowed text-white":
              !table.getCanNextPage(),
            "bg-white cursor-pointer text-slate-900": table.getCanNextPage(),
          })}
        >
          Next
        </button>
      </div>
    </div>
  );
}
