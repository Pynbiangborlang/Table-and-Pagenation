/**
 * Pagination controller
 * it has a drop down menu for selecting number of rows to display at once
 * it has a two link to navigate between pages
 * it displays the current page and the total number of pages
 *
 * props:
 * currentPage-> <number> tells the current page being displayed
 * rowsPerPage-> <number>tells the number of posts displayed at once
 * totalRows -> <number>tells the total number of rows for the fetched data
 * options -> [Number] tells the list of values in the drop down list, these values are
 *            use for setting rows per page
 * setRowsPerPage-> function to handle when an option is select from drop down lists
 * paginate->its a function for handling page change
 */

import React, { useEffect, useState } from "react";

const Pagination = ({
  currentPage,
  rowsPerPage,
  totalRows,
  paginate,
  options,
  setRowsPerPage,
}) => {
  return (
    <div className="paginate .bg-light">
      {/* drop down list*/}
      <select
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            show {option}
          </option>
        ))}
      </select>
      <div>
        <span>
          {currentPage} of {totalRows / rowsPerPage}
        </span>
        <a onClick={() => paginate(currentPage - 1)}>&lt;</a>
        <a onClick={() => paginate(currentPage + 1)}>&gt;</a>
      </div>
    </div>
  );
};

export default Pagination;
