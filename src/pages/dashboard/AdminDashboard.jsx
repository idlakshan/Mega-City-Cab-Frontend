import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const AdminDashboard = () => {

    const navItems = [

        { label: "Dashboard", path: "/dashboard/admin" },
        { label: "Manage Vehicles", path: "/dashboard/manage-vehicles" },
        { label: "View Users", path: "/dashboard/users" },
        { label: "Manage Drivers", path: "/dashboard/manage-drivers" },
        { label: "All Bookings", path: "/dashboard/manage-bookings" },

    ]

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Mega City Cabs</h1>
            </div>
            <nav>
                <ul className="space-y-4">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                 to={item.path}
                                className="flex items-center p-2 rounded-lg hover:bg-primary-yellow hover:text-primary-black transition-all duration-300"
                            >
                                <span className="ml-2"> {item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default AdminDashboard