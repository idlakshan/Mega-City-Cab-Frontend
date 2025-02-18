import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const DriverTable = ({ drivers, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter((driver) =>
    driver.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.driverNic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.driverEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.driverContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

 // console.log(drivers)

  return (
    <section>
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-primary-black">Drivers</h2>
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
                    <div className="font-semibold text-left">Driver Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">NIC</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Contact</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">License</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Edit</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Delete</div>
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-gray-100">
                {filteredDrivers.map((driver) => (
                  <tr key={driver.driverId}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-primary-black">{driver.driverName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{driver.driverNic}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{driver.driverEmail}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{driver.driverContact}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={`http://localhost:8080/api/v1/uploads/driver/${driver.licenseImage}`}
                          alt="License"
                          className="rounded-sm w-10 h-10"
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${driver.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : driver.status === 'Absent'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {driver.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        <Link
                          to={`/dashboard/edit-driver/${driver.driverId}`}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FaEdit className="inline-block" /> Edit
                        </Link>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        <button
                          onClick={() => handleDelete(driver.driverId)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
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

export default DriverTable;