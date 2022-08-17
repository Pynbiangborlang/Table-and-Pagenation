import React, { useState } from "react";
import "./ReactTable.css";
import * as XLSX from "xlsx/xlsx.mjs";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  filterFns,
} from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";

const ReactTable = ({ columns, data, className = "", ...props }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
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
  console.log("table", table.getFilteredRowModel());
  return (
    <>
      {props?.isFilterable && (
        <div className="search-input">
          <DebouncedInput
            value=""
            onChange={(value) => props.filter(value)}
            className="rt-filter-input"
            placeholder={
              props.inputPlaceHolder
                ? props.inputPlaceHolder
                : "Search all columns..."
            }
          />
        </div>
      )}
      {props?.isExportable && (
        <button className=".rt-export-btn" onClick={exportFile}>
          {props.exportIcon ? props.exportIcon : "Export"}
        </button>
      )}
      <table className={`react-table border-none ${className}`}>
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
