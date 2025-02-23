import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  // const assignedCar = useSelector((state) => state.checkout.assignedCar);
  // const assignedDriver = useSelector((state) => state.checkout.assignedDriver);

  // console.log(assignedCar);
  

  useEffect(() => {
    // Redirect to home or any other page after a few seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-lg text-gray-700">You will be redirected to the home page shortly.</p>
    </div>
  );
}

export default Success;