/*-------REACT TABLE V7----
 * Author "Pynbiangborlang L Rapthap"
 * building a Table component using react-tablev7
 * this component returns a table with provided data
 * it uses useTable  and useGlobalFilter
 * takes props columns[], data[](needs
 * to be memoized before passing as arguments) and
 * className<optional> and showGlobalFilter<boolean>(required)
 *
 * STILL NEEDS IMPROVEMENT
 */
import React, { useState } from "react";
import { useGlobalFilter, useTable } from "react-table";
import { GlobalFilter } from "./GlobalFilter";

export const Table = ({ columns, data, className, showGlobalFilter }) => {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;
  return (
    <>
      {showGlobalFilter && (
        <GlobalFilter setFilter={(value) => setGlobalFilter(value)} />
      )}
      <table
        className={
          className === undefined
            ? "table table-striped"
            : className === ""
            ? "table table-striped"
            : className
        }
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
