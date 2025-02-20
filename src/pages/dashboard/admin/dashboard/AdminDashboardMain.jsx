import React, { useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetBookingsCountQuery, useGetLast7DaysDataQuery } from '../../../../redux/features/booking/bookingApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboardMain = () => {
  const { data: statsData, error: statsError, isLoading: statsLoading,refetch } = useGetBookingsCountQuery();
  const { data: last7DaysData, error: last7DaysError, isLoading: last7DaysLoading,refetch:dataRefetch } = useGetLast7DaysDataQuery();

   useEffect(() => {
      refetch();
      dataRefetch()
    }, [refetch,dataRefetch]);

  if (statsLoading || last7DaysLoading) return <p>Loading...</p>;
  if (statsError || last7DaysError) return <p>Error fetching data</p>;

  const stats = statsData?.data
    ? [
        { title: 'Total Bookings', value: statsData.data.totalBookings },
        { title: 'Active Drivers', value: statsData.data.activeDrivers },
        { title: 'Available Vehicles', value: statsData.data.availableVehicles },
        { title: 'Total Revenue', value: `LKR ${statsData.data.totalRevenue.toLocaleString()}` },
      ]
    : [];

  const paymentsData = {
    labels: Object.keys(last7DaysData?.data?.paymentsLast7Days || {}).reverse(),
    datasets: [
      {
        label: 'Total Payments (LKR)',
        data: Object.values(last7DaysData?.data?.paymentsLast7Days || {}).reverse(),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const bookingsData = {
    labels: Object.keys(last7DaysData?.data?.bookingsLast7Days || {}).reverse(),
    datasets: [
      {
        label: 'Recent Bookings',
        data: Object.values(last7DaysData?.data?.bookingsLast7Days || {}).reverse(),
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-primary-black mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-sm text-gray-500">{stat.title}</h4>
            <p className="text-2xl font-bold text-primary-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-primary-black mb-4">Total Payments</h2>
          <Bar
            data={paymentsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Daily Payments in LKR',
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-primary-black mb-4">Recent Bookings</h2>
          <Line
            data={bookingsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Daily Bookings',
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardMain;