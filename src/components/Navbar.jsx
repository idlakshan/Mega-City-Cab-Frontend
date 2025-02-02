import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

                    <Link to="/login" className="hidden md:block">
                        <FaUserCircle className="text-3xl link text-primary-black" />
                    </Link>

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
                    <Link to="/login">
                        <FaUserCircle className="text-3xl link text-primary-black" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
