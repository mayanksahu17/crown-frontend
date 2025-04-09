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
    <div className={clsx("relative inline-block w-full", className)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "cursor-pointer border rounded-md px-3 py-2 z-10 text-sm leading-tight flex items-center justify-between font-normal",
          className?.includes("bg-[#1E293B]") && "bg-[#1E293B] border-gray-700 text-white"
        )}
      >
        <span>
          {value ? value.label : placeHolder ? placeHolder : "Select"}
        </span>
        <IoMdArrowDropdown
          className={`${
            isOpen ? "transform duration-300 ease-in-out rotate-180" : ""
          } ${className?.includes("text-white") ? "text-white" : "text-gray-500"}`}
          size="22"
        />
      </div>
      {isOpen && (
        <div className={clsx(
          "absolute mt-2 w-full text-sm border z-50 rounded-md shadow-md",
          className?.includes("bg-[#1E293B]") ? 
            "bg-[#1E293B] border-gray-700 text-white" : 
            "bg-white border-secondary text-black"
        )}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={clsx(
                "cursor-pointer px-3 py-2 text-sm font-normal w-full hover:bg-opacity-10",
                className?.includes("bg-[#1E293B]") ? "hover:bg-gray-500" : "hover:bg-gray-100"
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
