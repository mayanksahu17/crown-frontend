import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import routes from "../../constants/route";
import clsx from "clsx";
import { useState } from "react";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const toggleSidebarOpen = () => setIsSidebarOpen((prev) => !prev);

  const [activeRoute, setActiveRoute] = useState("");

  return (
    <nav
      className={clsx(
        "z-50 hidden bg-[#242424] h-full py-6 lg:flex flex-col transition-all duration-300 ease-in-out ",
        isSidebarOpen ? "w-[16%]" : "w-[7%] max-w-[100px]",
        isSidebarOpen
          ? "items-start justify-between"
          : "items-center justify-between"
      )}
    >
      <div className="flex flex-col justify-between items-center h-full w-full ">
        <div className={clsx("flex flex-col space-y-10 w-full items-center")}>
          <h1
            className="cursor-pointer text-2xl text-white"
            onClick={() => {
              navigate("/");
            }}
          >
            Crown <br /> Bankers
          </h1>

          <div className="flex flex-col items-center justify-center p-2 w-full  ">
            {routes.map((el, index) => (
              <SidebarItem
                key={index}
                {...el}
                navigate={navigate}
                isSidebarOpen={isSidebarOpen}
                setActiveRoute={setActiveRoute}
                activeRoute={activeRoute}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function SidebarItem({
  name,
  route,
  isSidebarOpen,
  setActiveRoute,
  activeRoute,
  navigate,
}) {
  const location = useLocation();
  const isActive = location.pathname === route;

  const handleRoute = (route) => {
    setActiveRoute(route);
    navigate(route);
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center w-full p-3",
        isActive ? "bg-[#000000]" : ""
      )}
    >
      <div className="flex items-center justify-center w-full">
        <div
          className="w-full flex items-center  cursor-pointer"
          onClick={() => {
            handleRoute(route);
          }}
        >
          {isSidebarOpen && <p className="text-white">{name}</p>}
        </div>
      </div>
    </div>
  );
}
