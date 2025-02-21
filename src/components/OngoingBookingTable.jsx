import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetAllBookingsQuery, useUpdateBookingMutation } from "../redux/features/booking/bookingApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const OngoingBookingsTable = () => {
  const {data: bookingData,isLoading: isBookingLoading,isError: isBookingError,refetch,} = useGetAllBookingsQuery();
  const[updateBooking]=useUpdateBookingMutation();
  const dispatch=useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const ongoingBookings = bookingData?.data?.bookings?.filter(
    (booking) => booking.status === "InProgress"
  ) || [];

  console.log(ongoingBookings);
  

 
  const filteredBookings = ongoingBookings.filter((booking) =>
    booking.bookingId.toString().includes(searchTerm.toLowerCase()) ||
    booking.car.carNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.driver.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleStatusChange = async (bookingId, newStatus) => {
    try {
        const result = await updateBooking({ bookingId, status: newStatus }).unwrap();
        toast.success(`Booking ID ${bookingId} updated to ${newStatus}`);
    } catch (error) {
        toast.error('Failed to update booking. Try again!');
    }
};


  if (isBookingLoading) {
    return <div>Loading...</div>;
  }

  if (isBookingError) {
    return <div>Error loading bookings.</div>;
  }

  return (
    <section>
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-primary-black">Ongoing Bookings</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pl-10 w-60 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow"
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="p-3">
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Booking ID</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Date Time</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Car Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Car Number</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Driver Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Pickup Location</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Drop Location</div>
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-gray-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-primary-black">{booking.bookingId}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{booking.bookingDateTime}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{booking.car.carName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{booking.car.carNumber}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{booking.driver.driverName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.bookingId, e.target.value)}
                        className={`px-2 py-1 rounded-full text-sm outline-none ${booking.status === "InProgress" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                      >
                        <option value="InProgress">InProgress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{booking.pickupLocation}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{booking.dropLocation}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingBookingsTable;