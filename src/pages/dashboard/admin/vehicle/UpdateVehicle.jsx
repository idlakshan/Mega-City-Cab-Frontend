import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaTimes,
  FaCar,
  FaList,
  FaIdBadge,
  FaImage,
  FaCheckCircle,
} from "react-icons/fa";
import { useGetCategoryNamesQuery } from "../../../../redux/features/category/categoryApi";
import {
  useUpdateCarMutation,
  useGetCarwithCategoryByIdQuery,
} from "../../../../redux/features/vehicle/VehicleApi";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const provinces = [
    "Central",
    "Eastern",
    "North Central",
    "Northern",
    "North Western",
    "Sabaragamuwa",
    "Southern",
    "Uva",
    "Western",
  ];

  const {
    data: response,
    isLoading: isCategoriesLoading,
    error: fetchError,
  } = useGetCategoryNamesQuery();
  const {
    data: vehicleCategoryData,
    isLoading: isVehicleLoading,
    error: vehicleError,
  } = useGetCarwithCategoryByIdQuery(id);
  const [updateCar, { isLoading: isUpdating }] = useUpdateCarMutation();

  useEffect(() => {
    if (response && response.data) {
      setCategories(response.data);
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      carName: "",
      province: "",
      carNumber: "",
      carImage: null,
      status: "Available",
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().required("Category is required"),
      carName: Yup.string().required("Car Name is required"),
      province: Yup.string().required("Province is required"),
      carNumber: Yup.string()
        .matches(
          /^[A-Z]{2,3}-\d{4}$/,
          "Car Number must be in Sri Lankan format (e.g., ABC-1234)",
        )
        .required("Car Number is required"),
      carImage: Yup.mixed().nullable(),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: async (values) => {
      const combinedCarNumber = `${values.province} ${values.carNumber}`;

      const formData = new FormData();
      formData.append("categoryId", values.categoryId);
      formData.append("carName", values.carName);
      formData.append("carNumber", combinedCarNumber);
      formData.append("status", values.status);

      if (values.carImage && values.carImage instanceof File) {
        formData.append("carImage", values.carImage);
      }

      try {
        const result = await updateCar({ id, formData }).unwrap();
        if (result) {
          toast.success("Car updated successfully!");
          navigate("/dashboard/manage-vehicles");
        }
      } catch (error) {
        console.error("Error updating car:", error);
        if (error.status === 409) {
          toast.error(
            "Car number already exists. Please use a different number.",
          );
        } else {
          toast.error(
            `Failed to update car: ${error.data?.message || "Unknown error"}`,
          );
        }
      }
    },
  });


  useEffect(() => {
    if (vehicleCategoryData && vehicleCategoryData.data) {
      const { categoryId, carName, carNumber, carImage, status } =
        vehicleCategoryData.data;
      const lastSpaceIndex = carNumber.lastIndexOf(" ");
      const province = carNumber.substring(0, lastSpaceIndex);
      const number = carNumber.substring(lastSpaceIndex + 1);

      formik.setValues({
        categoryId: categoryId?.toString() || "",
        carName: carName || "",
        province: province || "",
        carNumber: number || "",
        carImage: carImage,
        status: status || "Available",
      });
    }
  }, [vehicleCategoryData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("carImage", file);
    }
  };

  const clearImage = () => {
    formik.setFieldValue("carImage", null);
  };

  if (isCategoriesLoading || isVehicleLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading vehicle data...</div>
      </div>
    );
  }

  if (fetchError || vehicleError) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading data: {fetchError?.message || vehicleError?.message}
      </div>
    );
  }


  const getImageSource = () => {
    if (formik.values.carImage instanceof File) {
      return URL.createObjectURL(formik.values.carImage);
    }
    if (typeof formik.values.carImage === "string" && formik.values.carImage) {
      return formik.values.carImage;
    }
    return null;
  };

  const imageSource = getImageSource();

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-primary-black">
        Edit Vehicle
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex gap-8">
        <div className="w-1/2 space-y-6">
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-primary-black"
            >
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
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <FaList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.categoryId}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="carName"
              className="block text-sm font-medium text-primary-black"
            >
              Car Model
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
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.carName}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-primary-black"
            >
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
                  <option value="" disabled>
                    Select Province
                  </option>
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
            <div className="flex gap-x-[75px]">
              {formik.touched.province && formik.errors.province ? (
                <div className="text-red-500 text-sm mt-1 flex">
                  {formik.errors.province}
                </div>
              ) : null}
              {formik.touched.carNumber && formik.errors.carNumber ? (
                <div className="text-red-500 text-sm mt-1 flex">
                  {formik.errors.carNumber}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="carImage"
              className="block text-sm font-medium text-primary-black"
            >
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
                className="cursor-pointer bg-primary-light px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center gap-2 inline-block"
              >
                <FaImage className="text-gray-400" />
                <span>
                  {formik.values.carImage ? "Change Image" : "Choose Image"}
                </span>
              </label>
              {formik.values.carImage && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Clear
                </button>
              )}
            </div>
            {formik.touched.carImage && formik.errors.carImage ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.carImage}
              </div>
            ) : null}
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to keep current image
            </p>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-primary-black"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow transition-all"
              >
                <option value="Available">Available</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <FaList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.status}
              </div>
            ) : null}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || isUpdating}
              className={`bg-primary-yellow flex items-center gap-2 text-primary-black py-2 px-6 rounded-md text-lg shadow-lg ${
                !formik.isValid || !formik.dirty || isUpdating
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-yellow-600"
              }`}
            >
              <FaCheckCircle />
              <span>{isUpdating ? "Updating..." : "Update Vehicle"}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/manage-vehicles")}
              className="bg-gray-500 flex items-center gap-2 text-white py-2 px-6 rounded-md text-lg shadow-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          {imageSource ? (
            <div className="relative">
              <img
                src={imageSource}
                alt="Car Preview"
                className="w-64 h-64 object-cover rounded-md shadow-lg"
              />
              {formik.values.carImage &&
                formik.values.carImage instanceof File && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100"
                  >
                    <FaTimes className="text-red-500" />
                  </button>
                )}
            </div>
          ) : (
            <div className="text-gray-400">No image selected</div>
          )}
        </div>
      </form>
    </>
  );
};

export default UpdateVehicle;
