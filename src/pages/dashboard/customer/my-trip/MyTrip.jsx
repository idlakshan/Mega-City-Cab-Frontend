import React from 'react';
import { FiCalendar, FiMapPin, FiDollarSign, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

const MyTrip = () => {
  const trips = [
    {
      id: 1,
      date: '2023-10-15',
      pickupLocation: 'Colombo Fort',
      dropLocation: 'Negombo',
      cost: 'LKR 2,500',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2023-10-10',
      pickupLocation: 'Kandy',
      dropLocation: 'Galle',
      cost: 'LKR 4,000',
      status: 'InProgress',
    },
    {
      id: 3,
      date: '2023-10-05',
      pickupLocation: 'Gampaha',
      dropLocation: 'Colombo',
      cost: 'LKR 1,800',
      status: 'Cancelled',
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-primary-black mb-8">My Trips</h1>

      <div className="mb-6 flex items-center space-x-4">
        <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow">
          <option value="all">All Trips</option>
          <option value="completed">Completed</option>
          <option value="inprogress">In Progress</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
        />
      </div>

      <div className="space-y-4">
        {trips.map((trip) => (
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
