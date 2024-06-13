import React, { useEffect, useRef, useState } from "react";
import { GrNotification } from "react-icons/gr";
import { MdKeyboardArrowDown } from "react-icons/md";
import clsx from "clsx";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import searchData from "../../constants/searchData";
import { io } from "socket.io-client";
import notificationService from "../../services/notificationService";
import { toast } from "react-hot-toast";
import { Logo } from "../../assets";
import Notifications from "./Notifications";


export default function Navbar() {
  const handleNavigate = useNavigate();
  const { user, logOutUser } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentTime, setCurrentTime] = useState(getUKTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getUKTime());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);


  function getUKTime() {
    const ukTime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/London",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return `${ukTime} GMT`;
  }


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logOutUser();
    handleNavigate("/signin");
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = searchData.filter((data) =>
      data.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchResultClick = (route) => {
    handleNavigate(route);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="w-full mb-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl sm:text-4xl  sm:mb-0">
          Hi, {user?.user?.name.split(" ")[0]}!
        </h1>

        {/* Search Bar */}
        {/* <div className="relative max-w-xl w-full mr-2 mt-2 sm:mt-0 hidden lg:block">
          <input
            type="text"
            placeholder="Search Anything"
            className="pl-4 pr-10 py-1 bg-white w-full rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute right-3 top-2.5">
            <CiSearch size={20} color="#6B7280" />
          </div>
          {searchResults.length > 0 && (
            <div className="absolute max-w-sm lg:max-w-xl xl:max-w-2xl left-0 right-0 bg-white w-full border border-gray-300 rounded-md shadow-md mt-2 z-10 !pl-0">
              {searchResults.map((result) => (
                <div
                  key={result.route}
                  className="w-full px-4 hover:bg-gray-200 py-1.5 cursor-pointer "
                  onClick={() => handleSearchResultClick(result.route)}
                >
                  <p>{result.name}</p>
                </div>
              ))}
            </div>
          )}
        </div> */}

        <div className="flex items-center space-x-2 lg:space-x-4 relative ">
          <Notifications  />

          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="h-10 w-10 sm:h-10 sm:w-10 bg-white rounded-full cursor-pointer flex items-center justify-center">
              <img
                src={
                  user?.user?.profile_picture
                    ? user?.user?.profile_picture
                    : Logo
                }
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-10 z-50 sm:top-14 font-normal bg-white rounded shadow-sm mt-2 py-2 w-40 md:w-52 right-0 text-sm">
                <div
                  className="cursor-pointer px-3 py-1.5 hover:bg-gray-200"
                  onClick={() => handleNavigate("/dashboard/settings/profile")}
                >
                  Settings
                </div>
                <div
                  className="cursor-pointer px-3 py-1.5 hover:bg-gray-200"
                  onClick={() => handleNavigate("/")}
                >
                  Help & Support
                </div>
                <div
                  className="cursor-pointer px-3 py-1.5 hover:bg-red-100 text-red-400"
                  onClick={handleLogout}
                >
                  Log Out
                </div>
              </div>
            )}

            <div className="cursor-pointer hidden lg:block">
              <p className="text-[#272727] font-semibold text-sm sm:text-base tracking-[0.00563rem]">
                {user?.user?.name}
              </p>
              <p className="text-xs sm:text-sm font-normal">Customer</p>
            </div>
            <MdKeyboardArrowDown
              size={16}
              color="#6B7280"
              className={clsx(
                "hidden lg:block transition-transform duration-300 ease-in-out",
                {
                  "rotate-180": isDropdownOpen,
                }
              )}
            />
          </div>
        </div>
      </div>
      <p className="text-sm sm:text-lg mt-0 sm:mt-2">{currentTime}+1</p>
    </div>
  );
}
