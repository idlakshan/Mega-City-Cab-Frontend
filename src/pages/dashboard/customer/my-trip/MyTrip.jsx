import React, { useState } from 'react';
import { FiCalendar, FiMapPin, FiDollarSign, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import { useGetBookingDetailsQuery } from '../../../../redux/features/booking/bookingApi';

const MyTrip = () => {
  const { data: bookingDetails, isLoading, isError, refetch } = useGetBookingDetailsQuery();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

 
  const trips = bookingDetails?.data?.data?.map((trip) => ({
    id: trip.bookingId,
    date: trip.payment.paymentDate,
    pickupLocation: trip.pickupLocation,
    dropLocation: trip.dropLocation,
    cost: `LKR ${trip.payment?.amount?.toFixed(2) || '0.00'}`,
    status: trip.status,
  })) || [];


  const filteredTrips = trips.filter((trip) => {
    const matchesDate = selectedDate ? new Date(trip.date).toISOString().split('T')[0] === selectedDate : true;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'completed' && trip.status === 'Completed') ||
      (selectedStatus === 'inprogress' && trip.status === 'InProgress') ||
      (selectedStatus === 'cancelled' && trip.status === 'Cancelled');
    return matchesDate && matchesStatus;
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-primary-black mb-8">My Trips</h1>

      <div className="mb-6 flex items-center space-x-4">
        <select
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Trips</option>
          <option value="completed">Completed</option>
          <option value="inprogress">In Progress</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FiCalendar className="h-6 w-6 text-primary-black" />
                <div>
                  <p className="text-md font-medium text-gray-600">
                    {new Date(trip.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <FiMapPin className="inline-block mr-1" />
                    From: {trip.pickupLocation}
                  </p>
                  <p className="text-sm text-gray-500">
                    <FiMapPin className="inline-block mr-1" />
                    To: {trip.dropLocation}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-md font-semibold text-primary-black flex items-center">
                  <FiDollarSign className="mr-1" />
                  {trip.cost}
                </p>
                <p
                  className={`text-sm font-medium flex items-center ${
                    trip.status === 'Completed' ? 'text-green-600' :
                    trip.status === 'Cancelled' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}
                >
                  {trip.status === 'Completed' ? (
                    <FiCheckCircle className="mr-1" />
                  ) : trip.status === 'Cancelled' ? (
                    <FiXCircle className="mr-1" />
                  ) : (
                    <FiClock className="mr-1" />
                  )}
                  {trip.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyTrip;