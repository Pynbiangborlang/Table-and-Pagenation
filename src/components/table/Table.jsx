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
import generateExcel from "zipcelx";

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

  function getHeader(column) {
    if (column.totalVisibleHeaderCount === 1) {
      return [
        {
          value: column.Header,
          type: "string",
        },
      ];
    } else {
      const span = [...Array(column.totalVisibleHeaderCount - 1)].map((x) => ({
        value: "",
        type: "string",
      }));
      return [
        {
          value: column.Header,
          type: "string",
        },
        ...span,
      ];
    }
  }

  function getExcel() {
    const config = {
      filename: "general-ledger-Q1",
      sheet: {
        data: [],
      },
    };

    const dataSet = config.sheet.data;

    // review with one level nested config
    // HEADERS
    headerGroups.forEach((headerGroup) => {
      const headerRow = [];
      if (headerGroup.headers) {
        headerGroup.headers.forEach((column) => {
          headerRow.push(...getHeader(column));
        });
      }

      dataSet.push(headerRow);
    });

    // FILTERED ROWS
    if (rows.length > 0) {
      rows.forEach((row) => {
        const dataRow = [];
        console.log("row values", row.values);

        Object.values(row.values).forEach((value) =>
          dataRow.push({
            value,
            type: typeof value === "number" ? "number" : "string",
          })
        );

        dataSet.push(dataRow);
      });
    } else {
      dataSet.push([
        {
          value: "No data",
          type: "string",
        },
      ]);
    }

    return generateExcel(config);
  }

  return (
    <>
      {showGlobalFilter && (
        <GlobalFilter setFilter={(value) => setGlobalFilter(value)} />
      )}
      <button onClick={getExcel}>Get Exel</button>
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
          {rows.map((row) => {
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
