import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoryQuery } from '../redux/features/category/categoryApi';
import { setSelectedCategoryDetails, setSelectedCategoryPrice } from '../redux/features/checkout/checkout';

import cashIcon from '../assets/cash.png';
import snowIcon from '../assets/snow.png';
import passengerIcon from '../assets/passenger.png';
import baggageIcon from '../assets/baggage.png';


const featureIcons = [cashIcon, snowIcon, passengerIcon, baggageIcon];

const VehicleSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Budget');
  const distance = useSelector((state) => state.distance.value);
  const dispatch = useDispatch();

  const { data: response, isLoading, error } = useGetCategoryQuery();
  const categories = response?.data?.categories || [];

  const selectedCategoryDetails = categories.find((c) => c.name === selectedCategory) || null;

  const calculateTotalPrice = () => {
    if (!selectedCategoryDetails || isNaN(parseFloat(selectedCategoryDetails.price))) return 0;
    return parseFloat(selectedCategoryDetails.price) * (distance || 1);
  };

  
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    dispatch(setSelectedCategoryPrice(totalPrice.toFixed(2))); 
  }, [selectedCategory, distance, dispatch, selectedCategoryDetails]);

  const handleCategoryClick = (category) => {
   // console.log('Selected Category:', category); 
    setSelectedCategory(category.name);
  

    dispatch(
      setSelectedCategoryDetails({
        name: category.name,
        icon: category.icon,
      })
    );
  };

  return (
    <div className="w-full h-auto md:h-[150px] flex flex-col md:flex-row border-2 border-custom-opacity rounded-md">
      <div className="w-full md:w-3/5 h-auto md:h-full flex flex-wrap md:flex-nowrap gap-2 items-center p-2">
        {isLoading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error loading categories</p>
        ) : (
          categories.map((category) => {
            const categoryIcon = new URL(`../assets/${category.icon}`, import.meta.url).href;

            return (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className={`border-2 border-primary-light shadow-md rounded-lg w-28 h-28 md:h-3/4 cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.name ? 'bg-[#FCC737] text-white' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center flex-col py-4">
                  <span className="text-sm md:text-lg font-semibold text-primary-black">{category.name}</span>
                  <img src={categoryIcon} alt={category.name} className="w-10 md:w-14" />
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="w-full md:w-2/5 p-3">
        <div className="border rounded-lg border-custom-opacity h-full flex flex-col justify-center px-4 py-3">
          {selectedCategoryDetails ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center w-full mb-3">
                <h2 className="text-lg font-bold text-primary-black">{selectedCategoryDetails.title}</h2>
                <div className="bg-primary-light w-32 h-8 rounded-md shadow-sm flex justify-center items-center mt-2 md:mt-0">
                  <span className="text-primary-black font-bold">
                    LKR{' '}
                    {isNaN(parseFloat(selectedCategoryDetails.price)) || isNaN(parseFloat(distance))
                      ? '0.00'
                      : (parseFloat(selectedCategoryDetails.price) * parseFloat(distance)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-3">
                {selectedCategoryDetails.features &&
                  JSON.parse(selectedCategoryDetails.features).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <img src={featureIcons[index]} alt="" className="w-4" />
                      <span className="text-primary-black text-sm">{feature}</span>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <p className="text-primary-black text-center">Select a category to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;