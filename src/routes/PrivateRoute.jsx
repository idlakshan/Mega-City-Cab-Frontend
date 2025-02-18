import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children, role }) => {

    const {user}=useSelector((state)=>state.auth);


    const location = useLocation();

    if (!user) {
        toast.error("You must be logged in!");
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    
    if (role && !role.includes(user.role)) { 
        toast.error("You are not authorized to access this Page!");
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}

export default PrivateRoute