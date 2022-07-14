import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const DebouncedInput = ({ value, onChange, className, placeholder }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const debounced = useDebouncedCallback((value) => {
    onChange(value);
  }, 500);
  return (
    <input
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        debounced(inputValue);
      }}
      className={className}
      placeholder={placeholder}
    />
  );
};
