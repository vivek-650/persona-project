import React from "react";

export const Input = ({
  type = "text",
  placeholder = "Enter text",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-4 py-2 w-full rounded border-2 shadow-md transition focus:outline-hidden focus:shadow-xs ${
        props["aria-invalid"]
          ? "border-destructive text-destructive shadow-xs shadow-destructive"
          : ""
      } ${className}`}
      {...props} />
  );
};
