import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo, LogoutIcon } from "../../assets";
import routes from "../../constants/route";
import { MdKeyboardArrowLeft } from "react-icons/md";
import clsx from "clsx";
import { useState } from "react";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const handleNavigate = useNavigate();
  const toggleSidebarOpen = () => setIsSidebarOpen((prev) => !prev);

  const [activeRoute, setActiveRoute] = useState("");

  return (
    <nav
      className={clsx(
        "z-50 hidden bg-[#B9A164] h-full py-6 lg:flex flex-col transition-all duration-300 ease-in-out overflow-y-scroll",
        isSidebarOpen ? "w-[16%]" : "w-[7%] max-w-[100px]",
        isSidebarOpen
          ? "items-start justify-between"
          : "items-center justify-between"
      )}
    >
      <div className="flex flex-col justify-between items-center h-full w-full ">
        <div className={clsx("flex flex-col space-y-10 w-full items-center")}>
          <div className="cursor-pointer h-14 px-1 w-14 md:h-16 xl:h-18 md:w-16 xl:w-18 2xl:w-20 2xl:h-20 rounded-full bg-white flex items-center justify-center ">
            <img
              src={Logo}
              alt="Logo Image"
              className="w-[80%] h-full object-contain"
              onClick={() => handleNavigate("/")}
            />
          </div>
          <div className="flex flex-col items-center space-y-6 w-full pl-4 ">
            {routes.map((el, index) => (
              <SidebarItem
                key={index}
                {...el}
                handleNavigate={handleNavigate}
                toggleSidebarOpen={toggleSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                setActiveRoute={setActiveRoute}
                activeRoute={activeRoute}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            ))}
          </div>
        </div>
        <img
          src={LogoutIcon}
          alt="Logout"
          className={clsx(
            "w-4 md:w-7 h-auto cursor-pointer transition-transform duration-300 ease-in-out mt-10",
            {
              "rotate-0": isSidebarOpen,
              "rotate-180": !isSidebarOpen,
            }
          )}
          onClick={() => {
            toggleSidebarOpen();
            setActiveRoute(null);
          }}
        />
      </div>
    </nav>
  );
}

function SidebarItem({
  icon,
  name,
  route,
  toggleSidebarOpen,
  isSidebarOpen,
  setActiveRoute,
  activeRoute,
  childNavs,
  handleNavigate,
  setIsSidebarOpen,
}) {
  const handleRoute = (route) => {
    if (childNavs?.length > 0) {
      setActiveRoute(route === activeRoute ? null : route);
    } else {
      handleNavigate(route);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full px-3">
      <div className="flex items-center justify-between w-full">
        <div
          className="w-full flex items-center space-x-4 cursor-pointer"
          onClick={() => {
            handleRoute(route);
            setIsSidebarOpen(true);
          }}
        >
          <img src={icon} alt={name} className="w-4 md:w-7 h-auto" />
          {isSidebarOpen && <p className="text-white">{name}</p>}
        </div>
        {isSidebarOpen && childNavs?.length > 0 && (
          <MdKeyboardArrowLeft
            className={clsx("text-white cursor-pointer", {
              "-rotate-90": activeRoute === route,
            })}
            size={18}
            onClick={() => {
              handleRoute(route);
            }}
          />
        )}
      </div>
      {activeRoute === route && childNavs?.length > 0 && (
        <div className="w-full flex flex-col space-y-4 mt-3 ">
          {childNavs?.map(
            (
              { icon: Icon, name: childName, route: childRoute },
              childIndex
            ) => (
              <div
                key={childIndex}
                className="w-full flex items-center space-x-4 px-4 cursor-pointer"
                onClick={() => {
                  handleNavigate(childNavs?.length > 0 ? childRoute : route);
                  handleRoute(null);
                  setIsSidebarOpen(false);
                }}
              >
                <Icon color="white" size={20} />
                <p className="text-white text-sm">{childName}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
