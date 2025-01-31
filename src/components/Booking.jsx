import React from 'react'
import { RiArrowRightLine, RiMapPinLine, RiTimeLine } from 'react-icons/ri'

const Booking = () => {
    return (
        <>
            <div className="absolute top-[60%] sm:top-[65%] md:top-[60%] lg:top-[60%] xl:top-[60%] 2xl:top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-4 px-6 rounded-lg shadow-lg w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-8/12 border-2 border-custom-opacity">
                <div className="w-full h-[150px] border-2 border-custom-opacity rounded-md">

                </div>

                <form action="">
                    <div className="w-full flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 my-6">
                        <div className="w-full sm:flex-1">
                            <input
                                type="text"
                                name="pickLocation"
                                placeholder="Pick Location"
                                className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                            />

                        </div>
                        <RiArrowRightLine className="w-6 h-6 text-gray-500 hidden sm:block" />
                        <div className="w-full sm:flex-1">
                            <input
                                type="text"
                                name="dropLocation"
                                placeholder="Drop Location"
                                className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                            />

                        </div>
                        <div className="w-full sm:w-auto">
                            <input
                                type="datetime-local"
                                name="dateTime"
                                className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">

                        <div className="flex-1 flex flex-col space-y-4">
                            <div className="w-full h-14 flex items-center border border-gray-300 rounded-md px-4">
                                <img
                                    src="src/assets/flag.png"
                                    alt="Sri Lanka Flag"
                                    className="w-8 h-8 mr-2"
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Enter Phone Number"

                                    className="flex-1 h-full outline-none"
                                />
                            </div>


                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Name"

                                className="w-full h-14 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                            />


                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"

                                className="w-full h-14 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                            />


                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="fillDetails"

                                    className="w-5 h-5 text-primary-yellow border-gray-300 rounded focus:ring-0 checked:bg-yellow-500"
                                />
                                <span className="text-primary-black">Fill with my details</span>
                            </label>

                            <p className="text-sm font-semibold text-primary-black pt-4">
                                Please note: a 5% service tax is applicable to all bookings.
                            </p>
                        </div>


                        <div className="flex-1 flex flex-col">
                            <div className="w-full h-[250px] bg-gray-200 rounded-t-md flex items-center justify-center text-gray-500">


                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center border px-24 border-gray-300 rounded-b-md p-4 bg-white shadow-sm">
                                <div className="flex items-center text-gray-700 space-x-2 mb-4 sm:mb-0">
                                    <RiMapPinLine className="w-8 h-8 text-gray-500" />
                                    <span>0</span>
                                </div>
                                <div className="flex items-center text-gray-700 space-x-2">
                                    <RiTimeLine className="w-8 h-8 text-gray-500" />
                                    <span>0</span>
                                </div>
                            </div>


                            <div className="flex justify-end mt-4">
                                <button type="submit"  className='bg-primary-yellow text-primary-black py-2 px-4 rounded-md text-lg shadow-lg'>Checkout</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Booking