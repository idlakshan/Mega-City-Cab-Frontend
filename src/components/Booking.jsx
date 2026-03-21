import { useFormik } from "formik";
import L from "leaflet";
import { useEffect, useState } from "react";
import { RiArrowRightLine, RiMapPinLine, RiTimeLine } from "react-icons/ri";
import * as Yup from "yup";
import greenMarker from "/src/assets/pick.png";
import redMarker from "/src/assets/drop.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import VehicleSelection from "./VehicleSelection";
import { useDispatch, useSelector } from "react-redux";
import { setDistance } from "../redux/features/vehicle/distanceSlice";
import { useFetchCurrentUserQuery } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import {
  setAssignedCar,
  setAssignedDriver,
  setCheckoutData,
} from "../redux/features/checkout/checkout";
import AutoZoom from "../utils/AutoZoom";

import {
  useCreateBookingMutation,
  useLazyFetchCoordinatesQuery,
  useLazyFetchRouteQuery,
} from "../redux/features/booking/bookingApi";


const startIcon = new L.Icon({
  iconUrl: greenMarker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});
const endIcon = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});


const validationSchema = Yup.object({
  pickLocation: Yup.string()
    .required("Pick location is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
  dropLocation: Yup.string()
    .required("Drop Location is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
  dateTime: Yup.date()
    .required("Date and Time is required")
    .test(
      "is-future",
      "Date and Time must be at least 1 hour in the future",
      (value) => {
        if (!value) return false;
        const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);
        return value > oneHourLater;
      },
    ),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^(?:\+94|0)?(?:7\d{8})$/, "Invalid Sri Lankan mobile number"),
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]{3,}$/, "Name must contain at least 3 words"),
  email: Yup.string().required("Email is required").email("Invalid email"),
});

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const distance = useSelector((state) => state.distance.value);
  const { data: userData, refetch } = useFetchCurrentUserQuery();
  const { user } = useSelector((state) => state.auth);
  const selectedCategoryPrice = useSelector(
    (state) => state.checkout.selectedCategoryPrice,
  );
  const selectedCategoryid = useSelector(
    (state) => state.checkout.selectedCategoryId,
  );

  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState(null);


  const [createBooking] = useCreateBookingMutation();
  const [triggerFetchCoordinates] = useLazyFetchCoordinatesQuery();
  const [triggerFetchRoute] = useLazyFetchRouteQuery();

  const [debouncedPickLocation, setDebouncedPickLocation] = useState("");
  const [debouncedDropLocation, setDebouncedDropLocation] = useState("");


  const formik = useFormik({
    initialValues: {
      pickLocation: "",
      dropLocation: "",
      dateTime: "",
      phoneNumber: "",
      name: "",
      email: "",
      fillDetails: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!user) {
        toast.error("Please login to continue!");
        return;
      }

      const checkoutData = { ...values, selectedCategoryPrice };
      dispatch(setCheckoutData(checkoutData));

      try {
        const response = await createBooking({
          categoryId: selectedCategoryid,
        }).unwrap();
        const { car, driver } = response.data;

        dispatch(setAssignedCar(car));
        dispatch(setAssignedDriver(driver));
        navigate("/checkout");
      } catch (err) {
        toast.error(err?.data?.message || "Booking failed");
      }
    },
  });

  useEffect(() => {
    const pickTimer = setTimeout(
      () => setDebouncedPickLocation(formik.values.pickLocation),
      800,
    );
    const dropTimer = setTimeout(
      () => setDebouncedDropLocation(formik.values.dropLocation),
      800,
    );
    return () => {
      clearTimeout(pickTimer);
      clearTimeout(dropTimer);
    };
  }, [formik.values.pickLocation, formik.values.dropLocation]);


  useEffect(() => {
    const calculateRoute = async () => {
      if (!debouncedPickLocation || !debouncedDropLocation) {
        setStartCoords(null);
        setEndCoords(null);
        setRouteCoords([]);
        dispatch(setDistance(0));
        setDuration(null);
        setError(null);
        return;
      }

      try {
        setError(null);
        const startRes = await triggerFetchCoordinates(
          debouncedPickLocation,
        ).unwrap();
        const endRes = await triggerFetchCoordinates(
          debouncedDropLocation,
        ).unwrap();

        if (!startRes?.results?.length || !endRes?.results?.length) {
          throw new Error("Invalid Sri Lankan city names");
        }

        const start = startRes.results[0].geometry; 
        const end = endRes.results[0].geometry;

        setStartCoords(start);
        setEndCoords(end);

        const routeRes = await triggerFetchRoute({ start, end }).unwrap();
        const segment = routeRes.features[0].properties.segments[0];

        const distanceInKm = segment.distance / 1000;
        const durationInMin = segment.duration / 60;

        dispatch(setDistance(distanceInKm));
        setDuration(durationInMin);

        const route = routeRes.features[0].geometry.coordinates.map(
          ([lng, lat]) => ({ lat, lng }),
        );
        setRouteCoords(route);
      } catch (err) {
        console.error(err);
        setStartCoords(null);
        setEndCoords(null);
        setRouteCoords([]);
        dispatch(setDistance(0));
        setDuration(null);
        setError("Invalid locations or route error");
        toast.error("Invalid locations or route error");
      }
    };

    calculateRoute();
  }, [
    debouncedPickLocation,
    debouncedDropLocation,
    dispatch,
    triggerFetchCoordinates,
    triggerFetchRoute,
  ]);

  useEffect(() => {
    if (formik.values.fillDetails && userData) {
      formik.setValues({
        ...formik.values,
        phoneNumber: userData.data.phone,
        name: userData.data.name,
        email: userData.data.email,
      });
    } else if (!formik.values.fillDetails) {
      formik.setValues({
        ...formik.values,
        phoneNumber: "",
        name: "",
        email: "",
      });
    }
  }, [formik.values.fillDetails, userData]);

  const handleCheckboxChange = (e) => {
    if (!user) return toast.error("Please login to continue!");
    const checked = e.target.checked;
    formik.setFieldValue("fillDetails", checked);
    if (checked) refetch();
  };

  return (
    <>
      <div className="absolute top-[60%] sm:top-[65%] md:top-[60%] lg:top-[60%] xl:top-[82%] 2xl:top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-4 px-6 rounded-lg shadow-lg w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-8/12 border-2 border-custom-opacity">
        <VehicleSelection distance={distance} setDistance={setDistance} />

        <form onSubmit={formik.handleSubmit}>
          <div className="w-full flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 my-6">
            <div className="w-full sm:flex-1">
              <input
                type="text"
                name="pickLocation"
                placeholder="Pick Location"
                value={formik.values.pickLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
              />
              {formik.touched.pickLocation && formik.errors.pickLocation && (
                <p className="text-red-500 text-sm !mt-1">
                  {formik.errors.pickLocation}
                </p>
              )}
            </div>
            <RiArrowRightLine className="w-6 h-6 text-gray-500 hidden sm:block" />
            <div className="w-full sm:flex-1">
              <input
                type="text"
                name="dropLocation"
                placeholder="Drop Location"
                value={formik.values.dropLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
              />
              {formik.touched.dropLocation && formik.errors.dropLocation && (
                <p className="text-red-500 text-sm !mt-0">
                  {formik.errors.dropLocation}
                </p>
              )}
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="datetime-local"
                name="dateTime"
                value={formik.values.dateTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
              />
              {formik.touched.dateTime && formik.errors.dateTime && (
                <p className="text-red-500 text-sm !mt-0">
                  {formik.errors.dateTime}
                </p>
              )}
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
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="flex-1 h-full outline-none"
                  disabled={formik.values.fillDetails}
                />
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm !mt-0">
                  {formik.errors.phoneNumber}
                </p>
              )}

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-14 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                disabled={formik.values.fillDetails}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm !mt-0">
                  {formik.errors.name}
                </p>
              )}

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-14 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                disabled={formik.values.fillDetails}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm !mt-0 ">
                  {formik.errors.email}
                </p>
              )}

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="fillDetails"
                  checked={formik.values.fillDetails}
                  onChange={handleCheckboxChange}
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
                <MapContainer
                  center={[6.9271, 79.8612]}
                  zoom={10}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {startCoords && (
                    <Marker
                      position={[startCoords.lat, startCoords.lng]}
                      icon={startIcon}
                    >
                      <Popup>
                        {" "}
                        Start Location: {formik.values.pickLocation}
                      </Popup>
                    </Marker>
                  )}

                  {endCoords && (
                    <Marker
                      position={[endCoords.lat, endCoords.lng]}
                      icon={endIcon}
                    >
                      <Popup>End Location: {formik.values.dropLocation}</Popup>
                    </Marker>
                  )}

                  <Polyline
                    positions={routeCoords.map((point) => [
                      point.lat,
                      point.lng,
                    ])}
                    color="blue"
                    weight={4}
                    opacity={0.7}
                  />
                  <AutoZoom routeCoords={routeCoords} />
                </MapContainer>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center border px-10  border-gray-300 rounded-b-md p-4 bg-white shadow-sm">
                <div className="flex items-center text-gray-700 space-x-2 mb-4 sm:mb-0">
                  <RiMapPinLine className="w-8 h-8 text-gray-500" />
                  <span>{distance ? `${distance.toFixed(2)} km` : "0 Km"}</span>
                </div>
                <div className="flex items-center text-gray-700 space-x-2">
                  <RiTimeLine className="w-8 h-8 text-gray-500" />
                  <span>
                    {duration
                      ? duration >= 60
                        ? `${(duration / 60).toFixed(2)} h`
                        : `${duration.toFixed(0)} minutes`
                      : "0.00 minutes"}
                  </span>
                </div>
              </div>
              <p className="text-red-500 text-sm mt-1">{error}</p>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                  className={`bg-primary-yellow text-primary-black py-2 px-4 rounded-md text-lg shadow-lg ${
                    !formik.isValid || !formik.dirty
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Booking;
