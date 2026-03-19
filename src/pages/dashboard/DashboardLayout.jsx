import { Outlet, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import Avatar from "../../../src/assets/avatar.png";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  const renderDashboard = () => {
    if (user?.roles.includes("ADMIN")) return <AdminDashboard />;
    if (user?.roles.includes("CUSTOMER")) return <CustomerDashboard />;
    return <Navigate to="/login" replace />;
  };

  return (
    <div className="bg-primary-light !mb-[-25px]">
      <aside className="fixed inset-y-0 left-0 w-64 bg-primary-black text-white p-6">
        {renderDashboard()}
      </aside>

      <div className="ml-64">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary-black">
            {user.roles.includes("ADMIN")
              ? "Admin Dashboard"
              : "Customer Dashboard"}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-primary-light transition-all duration-300">
              🔔
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={Avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-primary-black">
                {user.roles.includes("ADMIN") ? "Admin" : "Customer"}
              </span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
