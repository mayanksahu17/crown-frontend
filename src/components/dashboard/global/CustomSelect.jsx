import clsx from "clsx";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function CustomSelect({
  options,
  handleChange,
  placeHolder,
  value,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setIsOpen((prev) => !prev);
    handleChange(option);
  };

  return (
    <div className={clsx("relative inline-block w-full ", className)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer border rounded-md px-3 py-2 z-10 text-sm leading-tight flex items-center justify-between font-normal"
      >
        <span>
          {value ? value.label : placeHolder ? placeHolder : "Select"}
        </span>
        <IoMdArrowDropdown
          className={`text-gray-500 ${
            isOpen ? "transform duration-300 ease-in-out rotate-180" : ""
          }`}
          size="22"
        />
      </div>
      {isOpen && (
        <div className="absolute mt-2 !w-full bg-white text-black text-sm border border-secondary z-50 rounded-md shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer px-2 py-2 text-md font-normal !w-full "
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
