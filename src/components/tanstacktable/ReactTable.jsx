import React, { useState } from "react";
// @ts-ignore
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";

const ReactTable = ({ columns, data, className }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });
  console.log("header groups-", table.getHeaderGroups());
  console.log("getRowModel ", table.getRowModel());

  return (
    <>
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(value)}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
      />
      <table
        className={
          className === undefined
            ? "table table-striped"
            : className === ""
            ? "table table-striped"
            : className
        }
      >
        <thead>
          <tr>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th>{header.id}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr id={row.id}>
              {row.getVisibleCells().map((cell) => {
                console.log("cell--", cell);
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReactTable;
