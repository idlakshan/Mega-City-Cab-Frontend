import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import avatarImage from '../assets/avatar.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropDownToggle, setIsDropDownToggle] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "auth/logout" }); 
      setIsDropDownToggle(false);
      navigate("/");
    } catch (error) {
      console.log("Failed to logout ", error);
    }
  };

  const handleDropDownOpen = () => {
    setIsDropDownToggle(!isDropDownToggle);
  };

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Vehicles", path: "/dashboard/manage-vehicles" },
    { label: "View Users", path: "/dashboard/view-users" },
    { label: "Manage Drivers", path: "/dashboard/manage-drivers" },
    { label: "All Bookings", path: "/dashboard/manage-bookings" },

  ];

  const customerDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My-Trips", path: "/dashboard/my-trips" },
    { label: "Payments", path: "/dashboard/payments" },
  ];

  const dropdownMenus = user?.role === "ADMIN" ? adminDropDownMenus : customerDropDownMenus;

  return (
    <header>
      <nav className="max-w-[1200px] h-20 mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary-black">
          <Link to="/">Mega City Cabs</Link>
        </div>

        <ul className="hidden md:flex gap-10 font-semibold text-primary-black ">
          <li className="link"><Link to="/">Home</Link></li>
          <li className="link"><Link to="/about">About</Link></li>
          <li className="link"><Link to="/faqs">FAQs</Link></li>
          <li className="link"><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="flex items-center gap-6">
          <button className="bg-primary-yellow px-6 py-1 rounded-lg text-lg font-semibold hidden lg:block animate-[ring_1.2s_infinite_ease-in-out]">
            <i className="ri-phone-fill"></i> Call Us
          </button>

          {user ? (
            <div className="relative">
              <img
                src={avatarImage}
                alt=""
                className="size-8 rounded-full cursor-pointer"
                onClick={handleDropDownOpen}
              />
              {isDropDownToggle && (
                <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="text-sm space-y-4">
                    {dropdownMenus.map((menu, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsDropDownToggle(false)}
                          className="dropdown-items link"
                          to={menu.path}
                        >
                          {menu.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        className="dropdown-items w-full text-left"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hidden md:block">
              <FaUserCircle className="text-3xl link text-primary-black" />
            </Link>
          )}

          <button
            className="block md:hidden text-3xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </nav>

      <div className={`md:hidden bg-gray-100 px-4 pb-4 transition-all duration-300 ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col gap-4 text-primary-dark">
          <li className="link"><Link to="/">Home</Link></li>
          <li className="link"><Link to="/about">About</Link></li>
          <li className="link"><Link to="/faqs">FAQs</Link></li>
          <li className="link"><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="mt-4 flex justify-center text-center">
          {user ? (
            <div className="relative">
              <img
                src={avatarImage}
                alt=""
                className="size-8 rounded-full cursor-pointer"
                onClick={handleDropDownOpen}
              />
              {isDropDownToggle && (
                <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="text-sm space-y-4">
                    {dropdownMenus.map((menu, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsDropDownToggle(false)}
                          className="dropdown-items no-hover"
                          to={menu.path}
                        >
                          {menu.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        className="dropdown-items w-full text-left"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FaUserCircle className="text-3xl link text-primary-black" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;