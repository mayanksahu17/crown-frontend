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
    <div className="flex flex-col min-h-screen">
      <NewNavbar />
      <main className="flex-1 bg-white">
        <Outlet />
        <Whatsapp />
      </main>
    </div>
  );
}
