import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from 'react-router-dom';

const VehicleTable = ({ vehicles, categories, handleDelete }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryName = (categoryId) => {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };


  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.carNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryName(vehicle.categoryId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-primary-black">Vehicles</h2>
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
                    <div className="font-semibold text-left">Car Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Car Number</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Category</div>
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
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          <img
                            src={`http://localhost:8080/api/v1/uploads/vehicles/${vehicle.carImage}`}
                            alt={vehicle.carName}
                            className="rounded-full"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div className="font-medium text-primary-black">{vehicle.carName}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{vehicle.carNumber}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-primary-black">{getCategoryName(vehicle.categoryId)}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${vehicle.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : vehicle.status === 'Booked'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {vehicle.status === 'Booked' ? (
                          <span className="text-gray-400 cursor-not-allowed">
                            <FaEdit className="inline-block" /> Edit
                          </span>
                        ) : (
                          <Link
                            to={`/dashboard/edit-vehicle/${vehicle.id}`}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <FaEdit className="inline-block" /> Edit
                          </Link>
                        )}
                      </div>

                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        <button
                          onClick={() => vehicle.status !== 'Booked' && handleDelete(vehicle.id)}
                          disabled={vehicle.status === 'Booked'}
                          className={`transition-colors ${vehicle.status === 'Booked'
                              ? "text-gray-400 cursor-not-allowed" 
                              : "text-red-500 hover:text-red-700"   
                            }`}
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

export default VehicleTable;