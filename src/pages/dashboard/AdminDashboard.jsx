import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCar, FaUsers, FaUserPlus, FaListAlt, FaSignOutAlt } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
const AdminDashboard = () => {
   const dispatch=useDispatch();

    const navItems = [
        { label: "Dashboard", path: "/dashboard/admin", icon: <FaTachometerAlt /> },
        { label: "Add Vehicles", path: "/dashboard/add-vehicles", icon: <FaCar /> },
        { label: "Manage Vehicles", path: "/dashboard/manage-vehicles", icon: <FaCar /> },
        { label: "View Users", path: "/dashboard/view-users", icon: <FaUsers /> },
        { label: "Add Drivers", path: "/dashboard/add-drivers", icon: <FaUserPlus /> },
        { label: "Manage Drivers", path: "/dashboard/manage-drivers", icon: <FaUserPlus /> },
        { label: "All Bookings", path: "/dashboard/manage-bookings", icon: <FaListAlt /> },
    ];

    const handleLogout = async () => {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch({ type: "auth/logout" }); 
          navigate("/");
        } catch (error) {
          console.log("Failed to logout ", error);
        }
      };

    

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <Link to='/' className="text-2xl font-bold">Mega City Cabs</Link>
            </div>
            <nav>
                <ul className="space-y-4">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className="flex items-center p-2 rounded-lg hover:bg-primary-yellow hover:text-primary-black transition-all duration-300"
                            >
                                {item.icon} {/* Render the icon */}
                                <span className="ml-2">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center mt-16 p-2 rounded-lg bg-primary-yellow text-primary-black "
                >
                    <FaSignOutAlt /> {/* Logout icon */}
                    <span className="ml-2">Logout</span>
                </button>
            </nav>
        </>
    );
};

export default AdminDashboard;