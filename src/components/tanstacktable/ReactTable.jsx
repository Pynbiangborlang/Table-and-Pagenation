import React, { useState } from "react";
import "./ReactTable.css";
import * as XLSX from "xlsx/xlsx.mjs";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";

const ReactTable = ({ columns, data, className = "" }) => {
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

  // function to export download excel file
  const exportFile = () => {
    const table_elt = document.getElementsByTagName("table");
    const wb = XLSX.utils.table_to_book(table_elt[0]);

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    // @ts-ignore
    XLSX.writeFile(wb, "Report.xlsb");
  };

  return (
    <>
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(value)}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
      />
      <button onClick={exportFile}>Export</button>
      <table className={`table table-striped ${className}`}>
        <thead>
          <tr>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th key={header.id}>{header.id}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
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
