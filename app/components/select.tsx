import React from "react";

type SelectProps = {
  label: string;
  name: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = ({ name, label, options, onChange }: SelectProps) => {
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={name}
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>
      <select
        onChange={onChange}
        className="block w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      >
        <option value="" disabled hidden>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
