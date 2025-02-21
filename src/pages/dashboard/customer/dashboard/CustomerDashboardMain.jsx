import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiClock, FiMapPin, FiDollarSign, FiUser } from 'react-icons/fi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SimpleCustomerDashboard = () => {
  // Static data for the dashboard
  const paymentHistory = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Payments (LKR)',
        data: [5000, 7000, 9000, 12000, 8000, 11000, 13000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+94 77 123 4567',
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-primary-black mb-8">Customer Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-sm text-gray-500 flex items-center">
            <FiClock className="mr-2" /> Total Rides
          </h4>
          <p className="text-2xl font-bold text-primary-black">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-sm text-gray-500 flex items-center">
            <FiDollarSign className="mr-2" /> Total Spending
          </h4>
          <p className="text-2xl font-bold text-primary-black">LKR 45,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-sm text-gray-500 flex items-center">
            <FiUser className="mr-2" /> Active Since
          </h4>
          <p className="text-2xl font-bold text-primary-black">2023</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-sm text-gray-500 flex items-center">
            <FiMapPin className="mr-2" /> Favorite Location
          </h4>
          <p className="text-2xl font-bold text-primary-black">Colombo</p>
        </div>
      </div>

      {/* Payment History Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-primary-black mb-4">Payment History</h2>
        <Bar
          data={paymentHistory}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Monthly Payments in LKR',
              },
            },
          }}
        />
      </div>

      {/* Profile Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-primary-black mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-md font-medium text-gray-600">{userProfile.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-md font-medium text-gray-600">{userProfile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-md font-medium text-gray-600">{userProfile.phone}</p>
          </div>
          <button className="bg-primary-yellow text-primary-black font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default SimpleCustomerDashboard;