import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Success() {
  const navigate = useNavigate();
  const bookingId = localStorage.getItem('bookingId');
  const token = localStorage.getItem('token');
  const storedCar = JSON.parse(localStorage.getItem('assignedCar'));
  const storedDriver = JSON.parse(localStorage.getItem('assignedDriver'));
  const invoiceDownloaded = useRef(false);

  useEffect(() => {
    if (!invoiceDownloaded.current) {
      downloadInvoice();
      invoiceDownloaded.current = true;
    }
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const downloadInvoice = async () => {
    try {
      if (!bookingId) {
        throw new Error('Booking ID not found');
      }
      const response = await fetch(`http://localhost:8080/api/v1/generate-invoice?bookingId=${bookingId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch invoice');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${bookingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Invoice Download Error:', error);
      toast.error(`Failed to download invoice: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md w-full transform transition-all hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto text-green-500 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

   
        <h1 className="text-4xl font-bold text-gray-800 mt-6">Payment Successful!</h1>
        <p className="text-gray-600 mt-4">
          Your invoice is being downloaded. You will be redirected to the home page shortly.
        </p>


        {storedCar && storedDriver && (
          <div className="mt-6 bg-gray-50 p-6 rounded-lg space-y-4">
       
            <div className="flex justify-center">
              <img
                src={`http://localhost:8080/api/v1/uploads/vehicles/${storedCar.carImage}`}
                alt={`${storedCar.carName} Image`}
                className="w-48 h-32 object-cover rounded-md shadow-md"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/192'; 
                }}
              />
            </div>

  
            <h2 className="text-xl font-semibold text-gray-700">Your Booking Details</h2>
            <div className="space-y-2 text-left">
              <p className="text-gray-600">
                <span className="font-medium">Car:</span> {storedCar.carName} ({storedCar.carNumber})
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Driver:</span> {storedDriver.driverName} ({storedDriver.driverContact})
              </p>
            </div>
          </div>
        )}

   
        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-primary-black text-white rounded-lg hover:bg-black transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;