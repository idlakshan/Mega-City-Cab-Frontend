import React, { useState } from 'react'
import Booking from './Booking'
import Budget from '../assets/mini.png'
import City from '../assets/miniVan.png'
import Semi from '../assets/economy.png'
import Van from '../assets/van.png'
import Car from '../assets/Luxury.png'

 

const Banner = () => {
 const [distance, setDistance] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState('Budget');

    const vehicles = [
      {
        name: 'Budget',
        icon: <img src={Budget} alt="" className='w-10' />,
        details: {
          title: 'Budget',
          features: ['Flexible Price', 'Air Conditioned', '3 Passengers', 'Limited Baggage'],
          price: 'LKR 1500.00',
        },
      },
      {
        name: 'City',
        icon: <img src={City} alt="" className='w-10' />,
        details: {
          title: 'City',
          features: ['Flexible Price', 'Air Conditioned', '3 Passengers', 'Limited Baggage'],
          price: 'LKR 2000.00',
        },
      },
      {
        name: 'Semi',
        icon: <img src={Semi} alt="" className='w-10' />,
        details: {
          title: 'Semi',
          features: ['Flexible Price', 'Air Conditioned', '4 Passengers', 'Medium Baggage'],
          price: 'LKR 2500.00',
        },
      },
      {
        name: 'Car',
  
        icon: <img src={Car} alt="" className='w-10' />,
        details: {
          title: 'Car',
          features: ['Flexible Price', 'Air Conditioned', '5 Passengers', 'Large Baggage'],
          price: 'LKR 3000.00',
        },
      },
      {
        name: 'Van',
        icon: <img src={Van} alt="" className='w-8' />,
        details: {
          title: 'Van',
          features: ['Flexible Price', 'Air Conditioned', '7 Passengers', 'Extra Large Baggage'],
          price: 'LKR 4000.00',
        },
      },
    ];
    
    const handleVehicleClick = (vehicle) => {
     setSelectedVehicle(vehicle);
   };
 
   const selectedVehicleDetails = vehicles.find((v) => v.name === selectedVehicle)?.details;
   
    return (
        <div className="relative h-screen section_container">
            <div className="absolute inset-0 bg-cover bg-center" style={{
                backgroundImage: "url('https://kangaroocabs.com/assets/hero-ac80e8ed.jpg')",
            }}>
                <div className="absolute inset-0 bg-zinc-700 bg-opacity-50"></div>
            </div>

            <div className="absolute inset-x-0 top-16 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4">
                    Your Journey with Mega Cabs
                </h1>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                    Starts Here
                </h2>
                <h3 className="text-lg sm:text-2xl lg:text-xl pt-10">
                    Your safety and comfort is our concern
                </h3>
            </div>
           <Booking distance={distance} setDistance={setDistance}/>
        </div>
    )
}

export default Banner