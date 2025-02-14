import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Avatar from '../../../src/assets/avatar.png'

const DashboardLayout = () => {
  return (
    <div className="bg-primary-light !mb-[-25px]">
      <aside className="fixed inset-y-0 left-0 w-64 bg-primary-black text-white p-6 ">
       <AdminDashboard/>
      </aside>

      <div className="ml-64">
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-black">
              Admin Dashboard
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
                <span className="text-primary-black">Admin</span>
              </div>
            </div>
          </div>
        </header>

   
        <main className="p-6 ">
          <div className="bg-white rounded-lg shadow-md p-6">
           <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;