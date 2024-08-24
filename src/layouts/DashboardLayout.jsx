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
        <div className="w-full bg-white min-h-screen h-full">
          <div className="w-full flex h-full relative">
            <div className="bg-white w-full">
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
