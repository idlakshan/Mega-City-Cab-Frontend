import React, { useEffect, useState } from 'react';
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
import { useGetPaymentHistoryQuery, useGetUserStatsQuery } from '../../../../redux/features/booking/bookingApi';
import { useFetchCurrentUserQuery } from '../../../../redux/features/auth/authApi';
import UpdateProfileModal from '../../../../components/UpdateProfileModal ';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomerDashboardMain = () => {
 
  const { data: userData, isLoading: isUserLoading,refetch:userDetailsRefetch } = useFetchCurrentUserQuery();

  const { data: userStats, isLoading: isStatsLoading, isError,refetch } = useGetUserStatsQuery();
  const { data: paymentHistoryData, isLoading: isPaymentHistoryLoading,refetch:PaymentHistoryRefetch } = useGetPaymentHistoryQuery();

  console.log(paymentHistoryData?.data.paymentHistory);

  const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
  

  const [paymentHistory, setPaymentHistory] = useState({
    labels: [],
    datasets: [
      {
        label: 'Payments (LKR)',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (paymentHistoryData && paymentHistoryData.data && paymentHistoryData.data.paymentHistory) {
      const labels = Object.keys(paymentHistoryData.data.paymentHistory);
      const data = Object.values(paymentHistoryData.data.paymentHistory);
  
      setPaymentHistory({
        labels: labels,
        datasets: [
          {
            label: 'Payments (LKR)',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } else {

      setPaymentHistory({
        labels: [],
        datasets: [
          {
            label: 'Payments (LKR)',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [paymentHistoryData]);
  

  useEffect(()=>{
        refetch()
        PaymentHistoryRefetch()
        userDetailsRefetch()
  },[refetch,PaymentHistoryRefetch,userDetailsRefetch])


  if (isPaymentHistoryLoading||isUserLoading || isStatsLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching data</div>;


  return (
    <>
      <h1 className="text-3xl font-bold text-primary-black mb-8">Customer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-sm text-gray-500 flex items-center">
            <FiClock className="mr-2" /> Total Rides
          </h4>
          <p className="text-2xl font-bold text-primary-black">{userStats?.data?.totalRides}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-sm text-gray-500 flex items-center">
            <FiDollarSign className="mr-2" /> Total Spending
          </h4>
          <p className="text-2xl font-bold text-primary-black">LKR {userStats?.data?.totalSpending?.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-sm text-gray-500 flex items-center">
            <FiUser className="mr-2" /> Active Since
          </h4>
          <p className="text-2xl font-bold text-primary-black">{new Date(userStats?.data?.activeSince).getFullYear()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-sm text-gray-500 flex items-center">
            <FiMapPin className="mr-2" /> Favorite Location
          </h4>
          <p className="text-2xl font-bold text-primary-black">{userStats?.data?.favoriteLocation}</p>
        </div>
      </div>

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

      <div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-primary-black mb-4">Profile Information</h2>
  <div className="space-y-4">
    <div>
      <p className="text-sm text-gray-500">Name</p>
      <p className="text-md font-medium text-gray-600">{userData?.name}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500">Email</p>
      <p className="text-md font-medium text-gray-600">{userData?.email}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500">Phone</p>
      <p className="text-md font-medium text-gray-600">{userData?.phone}</p>
    </div>
    <button
      onClick={openModal}
      className="px-4 py-2 bg-primary-yellow text-primary-black shadow-md rounded-md"
    >
      Update Profile
    </button>
  </div>
</div>

<UpdateProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userData={userData}
      />
    </>
  );
};

export default CustomerDashboardMain;