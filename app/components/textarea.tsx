import React from "react";

type TextAreaProps = {
  label: string;
  name: string;
  placeholder?: string;
};

export const Textarea = ({ label, name, placeholder = "" }: TextAreaProps) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>
      <textarea
        rows={4}
        name={name}
        placeholder={placeholder}
        className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      ></textarea>
    </div>
  );
};
