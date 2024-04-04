import React from "react";

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
};

export const Input = ({ label, name, placeholder = "" }: InputProps) => {
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={name}
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>
  );
};
