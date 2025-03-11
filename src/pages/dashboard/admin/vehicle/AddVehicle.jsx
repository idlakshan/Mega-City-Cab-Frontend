import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes, FaCar, FaList, FaIdBadge, FaImage, FaCheckCircle } from 'react-icons/fa';
import { useGetCategoryNamesQuery } from '../../../../redux/features/category/categoryApi';
import { useAddCarMutation } from '../../../../redux/features/vehicle/VehicleApi';
import { toast } from 'react-toastify';

const AddVehicle = () => {
  const [categories, setCategories] = useState([]);
  const provinces = [
    'Central', 'Eastern', 'North Central', 'Northern', 'North Western',
    'Sabaragamuwa', 'Southern', 'Uva', 'Western'
  ];

  const { data: response, isLoading, error: fetchError } = useGetCategoryNamesQuery();
  const [addCar, { isLoading: isAdding, error: addError }] = useAddCarMutation();
console.log(addError);

  useEffect(() => {
    if (response && response.data && response.data.categories) {
      setCategories(response.data.categories);
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      categoryId: '',
      carName: '',
      province: '',
      carNumber: '',
      carImage: null,
      status: 'Available',
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().required('Category is required'),
      carName: Yup.string().required('Car Name is required'),
      province: Yup.string().required('Province is required'),
      carNumber: Yup.string()
        .matches(
          /^[A-Z]{2,3}-\d{4}$/,
          'Car Number must be in Sri Lankan format'
        )
        .required('Car Number is required'),
      carImage: Yup.mixed().required('Car Image is required'),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: async (values) => {
      const combinedCarNumber = `${values.province} ${values.carNumber}`;
    
      const formData = new FormData();
      formData.append('categoryId', values.categoryId);
      formData.append('carName', values.carName);
      formData.append('carNumber', combinedCarNumber);
      formData.append('carImage', values.carImage);
      formData.append('status', values.status);
    
      try {
        const result = await addCar(formData).unwrap();
        if (result) {
          toast.success('Car added successfully!');
          formik.resetForm();
        }
      } catch (error) {
        console.error('Error adding car:', error);
        if (error.status === 409) { 
          toast.error('Car number already exists. Please use a different number.');
        } else {
          toast.error(`Failed to add car: ${error.data?.message || 'Unknown error'}`);
          
        }
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('carImage', file);
    }
  };

  const clearImage = () => {
    formik.setFieldValue('carImage', null);
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (fetchError) {
    return <div>Error loading categories: {fetchError.message}</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-primary-black">
        Add New Vehicle
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex gap-8">
        <div className="w-1/2 space-y-6">
     
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-primary-black">
              Category
            </label>
            <div className="relative">
              <select
                id="categoryId"
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <FaList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.categoryId}</div>
            ) : null}
          </div>

      
          <div>
            <label htmlFor="carName" className="block text-sm font-medium text-primary-black">
              Car Modal
            </label>
            <div className="relative">
              <input
                type="text"
                id="carName"
                name="carName"
                value={formik.values.carName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
                placeholder="Enter Car Name"
              />
              <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.carName && formik.errors.carName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.carName}</div>
            ) : null}
          </div>

     
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-primary-black">
              Province & Car Number
            </label>
            <div className="flex gap-3">
              <div className="relative flex-2">
                <select
                  id="province"
                  name="province"
                  value={formik.values.province}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
                >
                  <option value="" disabled>Select Province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                <FaIdBadge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative flex-1">
                <input
                  type="text"
                  id="carNumber"
                  name="carNumber"
                  value={formik.values.carNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
                  placeholder="Enter Car Number (WP-1234)"
                />
                <FaIdBadge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className='flex gap-x-[75px]'>
              {formik.touched.province && formik.errors.province ? (
                <div className="text-red-500 text-sm mt-1 flex">{formik.errors.province}</div>
              ) : null}
              {formik.touched.carNumber && formik.errors.carNumber ? (
                <div className="text-red-500 text-sm mt-1 flex">{formik.errors.carNumber}</div>
              ) : null}
            </div>
          </div>

     
          <div>
            <label htmlFor="carImage" className="block text-sm font-medium text-primary-black">
              Car Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="carImage"
                name="carImage"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="carImage"
                className="cursor-pointer bg-primary-light px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
              >
                <FaImage className="text-gray-400" />
                <span>Choose Image</span>
              </label>
            </div>
            {formik.touched.carImage && formik.errors.carImage ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.carImage}</div>
            ) : null}
          </div>

       
          <div className="w-1/3">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || isAdding}
              className={` bg-primary-yellow flex items-center gap-2 text-primary-black py-2 px-4 rounded-md text-lg shadow-lg ${!formik.isValid || !formik.dirty ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
              }`}
            >
              <FaCheckCircle />
              <span>{isAdding ? 'Adding...' : 'Add Vehicle'}</span>
            </button>
          </div>
        </div>

     
        <div className="w-1/2 flex justify-center items-center">
          {formik.values.carImage ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(formik.values.carImage)}
                alt="Car Preview"
                className="w-64 h-64 object-cover rounded-md shadow-lg"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100"
              >
                <FaTimes className="text-red-500" />
              </button>
            </div>
          ) : (
            <div className="text-gray-400">No image selected</div>
          )}
        </div>
      </form>
    </>
  );
};

export default AddVehicle;