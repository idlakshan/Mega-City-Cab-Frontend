import React, { useState } from 'react';
import Budget from '../assets/mini.png';
import City from '../assets/miniVan.png';
import Semi from '../assets/economy.png';
import Van from '../assets/van.png';
import Car from '../assets/Luxury.png';

import Cash from '../assets/cash.png';
import Passengers from '../assets/passenger.png';
import Air from '../assets/snow.png';
import Baggage from '../assets/baggage.png';
import { useSelector } from 'react-redux';

const featureIcons = [Cash, Air, Passengers, Baggage];

const VehicleSelection = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('Budget');
  const distance = useSelector((state) => state.distance.value);

  const vehicles = [
    { name: 'Budget', icon: Budget, details: { title: 'Budget', features: ['Flexible Price', 'Air Conditioned', '3 Passengers', 'Limited Baggage'], price: 250.00 } },
    { name: 'City', icon: City, details: { title: 'City', features: ['Flexible Price', 'Air Conditioned', '3 Passengers', 'Limited Baggage'], price: 400.00 } },
    { name: 'Semi', icon: Semi, details: { title: 'Semi', features: ['Flexible Price', 'Air Conditioned', '4 Passengers', 'Medium Baggage'], price: 800.00 } },
    { name: 'Luxury', icon: Car, details: { title: 'Luxury', features: ['Flexible Price', 'Air Conditioned', '5 Passengers', 'Large Baggage'], price: 1200.00 } },
    { name: 'Van', icon: Van, details: { title: 'Van', features: ['Flexible Price', 'Air Conditioned', '7 Passengers', 'Extra Baggage'], price: 1500.00 } }
  ];

  const handleVehicleClick = (vehicle) => setSelectedVehicle(vehicle);

  const selectedVehicleDetails = vehicles.find((v) => v.name === selectedVehicle)?.details;

  return (
    <div className="w-full h-auto md:h-[150px] flex flex-col md:flex-row border-2 border-custom-opacity rounded-md">

      <div className="w-full md:w-3/5 h-auto md:h-full flex flex-wrap md:flex-nowrap gap-2 items-center p-2">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.name}
            onClick={() => handleVehicleClick(vehicle.name)}
            className={`border-2 border-primary-light shadow-md rounded-lg w-28 h-28 md:h-3/4 cursor-pointer transition-all duration-300 ${selectedVehicle === vehicle.name ? 'bg-[#FCC737] text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            <div className='flex items-center flex-col py-4'>
              <span className='text-sm md:text-lg font-semibold text-primary-black'>{vehicle.name}</span>
              <img src={vehicle.icon} alt={vehicle.name} className='w-10 md:w-14' />
            </div>
          </div>
        ))}
      </div>


      <div className="w-full md:w-2/5 p-3">
        <div className="border rounded-lg border-custom-opacity h-full flex flex-col justify-center px-4 py-3">
          {selectedVehicleDetails ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center w-full mb-3">
                <h2 className="text-lg font-bold text-primary-black">{selectedVehicleDetails.title}</h2>
                <div className="bg-primary-light w-32 h-8 rounded-md shadow-sm flex justify-center items-center mt-2 md:mt-0">
                <span className="text-primary-black font-bold">
          LKR {(isNaN(parseFloat(selectedVehicleDetails.price)) || isNaN(parseFloat(distance))
            ? '0.00'
            : (parseFloat(selectedVehicleDetails.price) * parseFloat(distance)).toFixed(2))}
        </span>


                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-3">
                {selectedVehicleDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <img src={featureIcons[index]} alt="" className='w-4' />
                    <span className="text-primary-black text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-primary-black text-center">Select a vehicle to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;