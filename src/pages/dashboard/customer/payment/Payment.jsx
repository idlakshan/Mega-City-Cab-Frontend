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



const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentTrends, setPaymentTrends] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Payments (LKR)',
        data: [5000, 7000, 9000, 12000, 8000, 11000, 13000],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  });



  // Filter payments by date range
  const filterPayments = () => {
    const filtered = payments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      return (
        (!startDate || paymentDate >= new Date(startDate)) &&
        (!endDate || paymentDate <= new Date(endDate))
      );
    });
    setFilteredPayments(filtered);
  };

  return (
    <>
   
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-primary-black mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Date</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Amount (LKR)</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Status</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {payment.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        payment.status === 'Success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button
                      onClick={() => alert(`Download receipt for payment ID: ${payment.id}`)}
                      className="bg-primary-yellow text-primary-black font-semibold py-1 px-3 rounded hover:bg-yellow-500 transition-colors flex items-center"
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