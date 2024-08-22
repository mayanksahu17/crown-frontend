import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Whatsapp from "../pages/Whatsapp";
import NewNavbar from "../components/dashboard/NewNavbar";

export default function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ location }} />;
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <NewNavbar />
        <div className="w-full bg-[#F5F7FB] min-h-screen h-full">
          <div className="w-full flex h-full relative">
            <div className="bg-gradient-to-l from-[#070707] to-[#27101A] w-full">
              <div className="p-3 lg:p-4 w-full h-full">
                <div className="min-h-screen h-full">
                  <Outlet />
                  <Whatsapp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
