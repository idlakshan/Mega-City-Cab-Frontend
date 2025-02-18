import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes, FaUser, FaIdCard, FaEnvelope, FaPhone, FaImage, FaCheckCircle } from 'react-icons/fa';
import { useAddDriverMutation } from '../../../../redux/features/driver/driverApi';
import { toast } from 'react-toastify';

const AddDriver = () => {
  const [addDriver, { isLoading: isAdding, error: addError }] = useAddDriverMutation();

  const formik = useFormik({
    initialValues: {
      driverName: '',
      driverNic: '',
      driverEmail: '',
      driverContact: '',
      driverAddress: '',
      licenseImage: null,
      status: 'Available',
    },
    validationSchema: Yup.object({
      driverName: Yup.string().required('Driver Name is required'),
      driverNic: Yup.string()
        .matches(
          /^[0-9]{9}[vVxX]?$/,
          'NIC must be in Sri Lankan format (e.g., 123456789V)'
        )
        .required('NIC is required'),
      driverEmail: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      driverContact: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          'Contact number must be 10 digits (e.g., 0712345678)'
        )
        .required('Contact is required'),
      driverAddress: Yup.string().required('Address is required'),
      licenseImage: Yup.mixed().required('License Image is required'),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('driverName', values.driverName);
      formData.append('driverNic', values.driverNic);
      formData.append('driverEmail', values.driverEmail);
      formData.append('driverContact', values.driverContact);
      formData.append('driverAddress', values.driverAddress);
      formData.append('licenseImage', values.licenseImage);
      
      try {
        const result = await addDriver(formData).unwrap();
        if (result) {
          toast.success('Driver added successfully!');
          formik.resetForm();
        }
      } catch (error) {
        console.error('Error adding driver:', error);
        toast.error(error.data?.error?.message || 'Unknown error');

      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('licenseImage', file);
    }
  };

  const clearImage = () => {
    formik.setFieldValue('licenseImage', null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-primary-black">
        Add New Driver
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex gap-8">
        <div className="w-1/2 space-y-6">
          {/* Driver Name */}
          <div>
            <label htmlFor="driverName" className="block text-sm font-medium text-primary-black">
              Driver Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={formik.values.driverName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
                placeholder="Enter Driver Name"
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.driverName && formik.errors.driverName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.driverName}</div>
            ) : null}
          </div>

          {/* Driver NIC */}
          <div>
            <label htmlFor="driverNic" className="block text-sm font-medium text-primary-black">
              Driver NIC
            </label>
            <div className="relative">
              <input
                type="text"
                id="driverNic"
                name="driverNic"
                value={formik.values.driverNic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
                placeholder="Enter NIC (e.g., 123456789V)"
              />
              <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.driverNic && formik.errors.driverNic ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.driverNic}</div>
            ) : null}
          </div>

          {/* Driver Email */}
          <div>
            <label htmlFor="driverEmail" className="block text-sm font-medium text-primary-black">
              Driver Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="driverEmail"
                name="driverEmail"
                value={formik.values.driverEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
                placeholder="Enter Email"
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.driverEmail && formik.errors.driverEmail ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.driverEmail}</div>
            ) : null}
          </div>

          {/* Driver Contact */}
          <div>
            <label htmlFor="driverContact" className="block text-sm font-medium text-primary-black">
              Driver Contact
            </label>
            <div className="relative">
              <input
                type="text"
                id="driverContact"
                name="driverContact"
                value={formik.values.driverContact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
                placeholder="Enter Contact (e.g., 0712345678)"
              />
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.driverContact && formik.errors.driverContact ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.driverContact}</div>
            ) : null}
          </div>

          {/* Driver Address */}
          <div>
            <label htmlFor="driverAddress" className="block text-sm font-medium text-primary-black">
              Driver Address
            </label>
            <div className="relative">
              <input
                type="text"
                id="driverAddress"
                name="driverAddress"
                value={formik.values.driverAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
                placeholder="Enter Address"
              />
              <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.driverAddress && formik.errors.driverAddress ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.driverAddress}</div>
            ) : null}
          </div>

          {/* License Image */}
          <div>
            <label htmlFor="licenseImage" className="block text-sm font-medium text-primary-black">
              License Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="licenseImage"
                name="licenseImage"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="licenseImage"
                className="cursor-pointer bg-primary-light px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
              >
                <FaImage className="text-gray-400" />
                <span>Choose License Image</span>
              </label>
            </div>
            {formik.touched.licenseImage && formik.errors.licenseImage ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.licenseImage}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="w-1/3">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || isAdding}
              className={`bg-primary-yellow flex items-center gap-2 text-primary-black py-2 px-4 rounded-md text-lg shadow-lg ${
                !formik.isValid || !formik.dirty ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
              }`}
            >
              <FaCheckCircle />
              <span>{isAdding ? 'Adding...' : 'Add Driver'}</span>
            </button>
          </div>
        </div>

        {/* Image Preview */}
        <div className="w-1/2 flex justify-center items-center">
          {formik.values.licenseImage ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(formik.values.licenseImage)}
                alt="License Preview"
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

export default AddDriver;