import React from 'react';
import { useSelector } from 'react-redux';
import { FiCalendar, FiMapPin } from 'react-icons/fi'; 

import { useNavigate } from 'react-router-dom';

function Checkout() {
  const checkoutData = useSelector((state) => state.checkout.checkoutData);
  const selectedCategoryPrice = useSelector((state) => state.checkout.selectedCategoryPrice);
  const selectedCategoryName = useSelector((state) => state.checkout.selectedCategoryName);
  const selectedCategoryIcon = useSelector((state) => state.checkout.selectedCategoryIcon);
  const navigate = useNavigate();

  // console.log('Selected Category Name:', selectedCategoryName);
  //console.log('Selected Category Icon:', selectedCategoryIcon);


  const totalPrice = selectedCategoryPrice ? (selectedCategoryPrice * 0.05).toFixed(2) : 0;


  const {
    pickLocation = '',
    dropLocation = '',
    dateTime = '',
    phoneNumber = '',
    name = '',
    email = '',
  } = checkoutData || {};

  return (
    <>
      <div className="bg-white rounded-lg w-full  p-6 md:p-12 lg:px-44 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-black">Checkout</h1>
          <p className="text-primary-black font-semibold text-lg pt-5">
            Almost there! Please take a moment to ensure all the details are
            accurate. If you need to make any changes, you can go back and edit
            your booking.
          </p>
        </div>


        <div className="flex flex-col md:flex-row space-x-0 md:space-x-14 mt-6">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Booking Details
            </h2>
            <div className="bg-white rounded-lg p-4 border border-custom-opacity pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <img
                    src={selectedCategoryIcon ? new URL(`../assets/${selectedCategoryIcon}`, import.meta.url).href : ''}
                    alt={selectedCategoryName}
                    className="w-14 h-14 mr-3"
                  />
                  <div>
                    <p className="text-md font-medium text-gray-600">{selectedCategoryName}</p>
                    {/* <p className="text-sm text-primary-black">Suzuki Alto</p> */}
                  </div>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="h-6 w-6 text-primary-black mr-3" />

                  <div>
                    <p className="text-md font-medium text-[#B6B1B1]">
                      Request Time
                    </p>
                    <p className="text-sm text-[#615E5E]">
                      {dateTime ? new Date(dateTime).toLocaleString() : 'Not available'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <FiMapPin className="h-6 w-6 text-[#615E5E] mr-3" />

                  <div>
                    <p className="text-md font-medium text-[#B6B1B1]">Pickup</p>
                    <p className="text-sm text-[#615E5E]">
                      {pickLocation || 'Not available'}, Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="h-6 w-6 text-[#615E5E] mr-3" />

                  <div>
                    <p className="text-md font-medium text-[#B6B1B1]">Drop</p>
                    <p className="text-sm text-[#615E5E]">
                      {dropLocation || 'Not available'}, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              User Details
            </h2>
            <div className="bg-white rounded-lg p-5 border border-custom-opacity">
              <div className='flex justify-between px-5 mr-0'>
              <div className="mb-2">
                <p className="text-sm font-medium text-[#B6B1B1]">Name</p>
                <p className="text-sm text-[#615E5E]">
                  {name || 'Not available'}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium text-[#B6B1B1]">Email</p>
                <p className="text-sm text-[#615E5E]">
                  {email || 'Not available'}
                </p>
              </div>
              </div>
            
              <div className='pt-2 pl-5'>
                <p className="text-sm font-medium text-[#B6B1B1]">
                  Mobile Number
                </p>
                <p className="text-sm text-[#615E5E]">
                  {phoneNumber || 'Not available'}
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-2 w-[35rem] absolute bottom-20 right-44">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Payment Details
          </h2>
          <div className="bg-white rounded-lg p-4 border border-custom-opacity">
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium text-[#B6B1B1]">Budget</p>
              <p className="text-sm text-primary-black">LKR {selectedCategoryPrice}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium text-[#B6B1B1]">Tax (5%)</p>
              <p className="text-sm text-primary-black">LKR {totalPrice}</p>
            </div>
            <div className="flex justify-between pt-3">
              <p className="text-sm font-bold text-primary-black">
                Your Payment
              </p>
              <p className="text-sm font-bold text-primary-black">LKR {parseFloat(selectedCategoryPrice) + parseFloat(totalPrice)}</p>
            </div>
          </div>


          <div className="flex justify-center md:justify-end mt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-100 text-gray-700 font-semibold py-2 px-6 rounded mr-2 hover:bg-gray-200"
            >
              Back
            </button>
            <button className="bg-primary-yellow text-primary-black font-semibold py-3 px-6 rounded">
              Confirm Ride
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;