import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const GlobalFilter = ({ setFilter }) => {
  const [value, setValue] = useState("");
  const debounced = useDebouncedCallback((value) => {
    setFilter(value);
  }, 500);
  return (
    <>
      <label>Search: </label>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          debounced(value);
        }}
      />
    </>
  );
};
