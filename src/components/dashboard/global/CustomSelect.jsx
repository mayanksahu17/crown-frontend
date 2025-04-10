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
    setIsOpen(false);
    handleChange(option);
  };

  return (
    <div className={clsx("relative inline-block w-full", className)}>
      {/* Select Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "cursor-pointer border rounded-md px-3 py-2 text-sm flex items-center justify-between font-normal transition-all",
          "bg-white text-gray-900 border-gray-300", // Light theme
          "dark:bg-[#1E293B] dark:text-white dark:border-gray-700"
        )}
      >
        <span>
          {value ? value.label : placeHolder || "Select"}
        </span>
        <IoMdArrowDropdown
          className={clsx(
            "transition-transform",
            isOpen ? "rotate-180" : "",
            "text-gray-500 dark:text-white"
          )}
          size={22}
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={clsx(
            "absolute mt-2 w-full border rounded-md shadow-md z-50 overflow-hidden text-sm",
            "bg-white text-gray-900 border-gray-300", // Light theme
            "dark:bg-[#1E293B] dark:text-white dark:border-gray-700"
          )}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={clsx(
                "cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
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
