import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaSignOutAlt,FaSuitcaseRolling, FaMoneyBillWave } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
const CustomerDashboard = () => {
   const dispatch=useDispatch();

   const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { label: "My-Trips", path: "/dashboard/my-trips", icon: <FaSuitcaseRolling /> }, 
    { label: "Payments", path: "/dashboard/payments", icon: <FaMoneyBillWave /> }, 
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
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
        
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center mt-16 p-2 rounded-lg bg-primary-yellow text-primary-black "
                >
                    <FaSignOutAlt /> 
                    <span className="ml-2">Logout</span>
                </button>
            </nav>
        </>
    );
};

export default CustomerDashboard;