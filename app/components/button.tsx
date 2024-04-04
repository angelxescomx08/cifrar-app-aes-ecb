import React, { ComponentProps } from "react";

export const Button = ({ children, ...rest }: ComponentProps<"button">) => {
  return (
    <button
      {...rest}
      className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
    >
      {children}
    </button>
  );
};
