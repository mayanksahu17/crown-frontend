import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar, Sidebar, HomeStats } from "../components";
import { useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import DrawerProvider from "../providers/DrawerProvider";
import { useAuth } from "../hooks/useAuth";
import clsx from "clsx";

export default function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  const hideNavbarPathNames = [
    "/dashboard/settings/profile",
    "/dashboard/settings/security",
    "/dashboard/settings/notification",
    "/dashboard/settings/kyc",
  ];

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  if (!user) {
    return <Navigate to="/signin" state={{ location }} />;
  }

  return (
    <>
      <div className="flex h-screen">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex-grow w-full bg-[#F5F7FB]  h-full">
          <div className="w-full flex h-full relative">
            <div
              className="w-10 h-10 rounded-full cursor-pointer z-[9999999999999999999999] bg-white absolute left-3 bottom-3 border border-gray-400 md:hidden shadow-sm shadow-black flex items-center justify-center"
              onClick={toggleDrawer}
            >
              <MdOutlineKeyboardDoubleArrowRight
                size={18}
                className={clsx(
                  "transition-all duration-300 ease-in-out",
                  isDrawerOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
            {pathname === "/dashboard" && <HomeStats />}
            <div className="overflow-y-auto w-full">
              <div className="p-3 lg:p-4 w-full">
                {!hideNavbarPathNames.includes(pathname) && <Navbar />}
                <DrawerProvider
                  isOpen={isDrawerOpen}
                  toggleDrawer={toggleDrawer}
                />
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
