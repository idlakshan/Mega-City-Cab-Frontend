import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import VehicleTable from '../../../../components/VehicleTable';
import { useGetCategoryQuery } from '../../../../redux/features/category/categoryApi';
import { useDeleteCarMutation, useGetCarsQuery } from '../../../../redux/features/vehicle/VehicleApi';
import CategoryCard from '../../../../components/CategoryCard';

const ManageVehicle = () => {
  const { data: categoriesResponse, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoryQuery();
  const { data: vehiclesResponse, isLoading: isVehiclesLoading, isError: isVehiclesError, refetch } = useGetCarsQuery();
  const [deleteCar] = useDeleteCarMutation();

  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const handleDelete = async (carId) => {
    try {
      await deleteCar(carId).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
    }
  };

  const handleUpdatePrice = (categoryId, newPrice) => {
    console.log(`Updating category ${categoryId} price to ${newPrice}`);
  
  };

  const toggleCategoriesVisibility = () => {
    setIsCategoriesVisible((prev) => !prev);
  };

  if (isCategoriesLoading || isVehiclesLoading) {
    return <div className="p-6 bg-gray-50 min-h-screen">Loading...</div>;
  }

  if (isCategoriesError || isVehiclesError) {
    return <div className="p-6 bg-gray-50 min-h-screen">Error loading data.</div>;
  }

  const initialCategories = categoriesResponse?.data?.categories || [];
  const vehicles = vehiclesResponse?.data?.vehicles || [];

  return (
    <div className="">
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={toggleCategoriesVisibility}
        >
          <h1 className="text-2xl font-bold text-primary-black pb-5">Vehicle Categories</h1>
          <span className="text-gray-600">
            {isCategoriesVisible ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isCategoriesVisible ? 'max-h-96' : 'max-h-0'}`}
        >
          <CategoryCard
            categories={initialCategories}
            onUpdatePrice={handleUpdatePrice}
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-8 mb-6 text-primary-black">Vehicle List</h1>
      <VehicleTable
        vehicles={vehicles}
        categories={initialCategories}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ManageVehicle;