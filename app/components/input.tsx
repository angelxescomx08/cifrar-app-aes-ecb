import React, { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  type: HTMLInputTypeAttribute;
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
};

export const Input = ({
  type,
  label,
  name,
  placeholder = "",
  register,
}: InputProps) => {
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={name}
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>
  );
};
