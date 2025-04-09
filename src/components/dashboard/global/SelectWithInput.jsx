import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function SelectWithInput({
  allOptions,
  defaultOption,
  handleOptionSelect,
  handleInputChange,
  value,
  placeHolder,
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropDown = () => setIsDropDownOpen((prev) => !prev);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, []);

  return (
    <div className="flex items-center relative bg-white border border-gray-200 rounded-md">
      <div
        className="flex items-center space-x-2 py-2 px-2 cursor-pointer "
        onClick={toggleDropDown}
      >
        <IoMdArrowDropdown
          className={clsx(
            {
              "rotate-180": isDropDownOpen,
              "rotate-0": !isDropDownOpen,
            },
            "transition-transform duration-250 ease-in-out"
          )}
          size="20"
          color="#C4C4C4"
        />
        <p className="text-black">{selectedOption}</p>
      </div>

      <div className="w-[1px] h-full bg-black" />

      {isDropDownOpen && (
        <div className="bg-white absolute w-16 top-12 left-2 z-[999999] rounded-md py-1">
          {allOptions.map((el, index) => (
            <p
              key={index}
              className="px-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setSelectedOption(el);
                handleOptionSelect(el);
                setIsDropDownOpen((prev) => !prev);
              }}
            >
              {el}
            </p>
          ))}
        </div>
      )}

      <input
        type="text"
        className="px-2 text-black placeholder:text-[#C4C4C4] outline-none"
        autoFocus
        placeholder={placeHolder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}
