/*
 * building a Table component using react-tablev7
 * this component returns a table
 * it uses useTable
 * building a Table component react-table version 7
 * takes props columns[], data[] and className<optional> needs
 * to be memoized before passing as arguments
 *
 * STILL NEEDS IMPROVEMENT
 */
import React from "react";
import { useTable } from "react-table";

export const Table = (props) => {
  let columns = props.columns;
  let data = props.data;
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table
      className={
        props.className === undefined ? "table table-striped" : props.className
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
