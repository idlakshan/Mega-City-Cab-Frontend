import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiDownload, FiFilter, FiCalendar } from 'react-icons/fi';
import { useGetBookingDetailsQuery } from '../../../../redux/features/booking/bookingApi';
import { toast } from 'react-toastify';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyPayments = () => {
  const { data: bookingDetails, isLoading, isError } = useGetBookingDetailsQuery();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchBookingId, setSearchBookingId] = useState('');

  useEffect(() => {
    if (bookingDetails && bookingDetails.data) {
      const paymentData = bookingDetails.data.data.map(booking => ({
        id: booking.payment.paymentId,
        date: booking.payment.paymentDate,
        amount: booking.payment.amount,
        status: booking.payment.paymentStatus,
        bookingId: booking.bookingId,
        bookingStatus: booking.status,
        paymentMethod: booking.payment.paymentMethod,
      }));
      setPayments(paymentData);
    }
  }, [bookingDetails]);

  useEffect(() => {
    filterPayments();
  }, [payments, searchBookingId, startDate, endDate]);

  const filterPayments = () => {
    const filtered = payments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      const matchesBookingId = searchBookingId
        ? payment.bookingId.toString().includes(searchBookingId)
        : true;
      const matchesDateRange =
        (!startDate || paymentDate >= new Date(startDate)) &&
        (!endDate || paymentDate <= new Date(endDate));

      return matchesBookingId && matchesDateRange;
    });
    setFilteredPayments(filtered);
  };

  const downloadInvoice = async (bookingId) => {
    try {
      if (!bookingId) {
        throw new Error('Booking ID not found');
      }
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/v1/generate-invoice?bookingId=${bookingId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching payment history</div>;

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-primary-black mb-4">Payment History</h2>
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by Booking ID"
            value={searchBookingId}
            onChange={(e) => setSearchBookingId(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Booking Id</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Booking Status</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Payment Date</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Amount (LKR)</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Payment Method</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Status</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {payment.bookingId}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${payment.bookingStatus === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : payment.bookingStatus === 'InProgress'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {payment.bookingStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {payment.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {payment.paymentMethod}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${payment.status === 'Success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button
                      onClick={() => downloadInvoice(payment.bookingId)}
                      disabled={payment.bookingStatus === 'Canceled'}
                      className={`bg-primary-yellow text-primary-black font-semibold py-1 px-3 rounded transition-colors flex items-center ${payment.bookingStatus === 'Canceled'
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-yellow-500'
                        }`}
                    >
                      <FiDownload className="mr-2" /> Receipt
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyPayments;