import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const GlobalFilter = ({ setFilter }) => {
  const [value, setValue] = useState("");
  const debounced = useDebouncedCallback((value) => {
    setFilter(value);
  }, 500);
  return (
    <div>
      <span>Search: </span>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          debounced(value);
        }}
      />
    </div>
  );
};
