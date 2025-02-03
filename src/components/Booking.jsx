import { useFormik } from 'formik';
import L from 'leaflet';
import React, { useEffect, useState } from 'react'
import { RiArrowRightLine, RiMapPinLine, RiTimeLine } from 'react-icons/ri'
import * as Yup from 'yup';
import greenMarker from "/src/assets/pick.png";
import redMarker from "/src/assets/drop.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css"
import axios from 'axios';
import { toast } from "react-toastify";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import VehicleSelection from './VehicleSelection';

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

function AutoZoom({ routeCoords }) {
    const map = useMap();

    useEffect(() => {
        if (routeCoords.length > 0) {
            const bounds = L.latLngBounds(routeCoords.map((point) => [point.lat, point.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [routeCoords, map]);

    return null;
}


const validationSchema = Yup.object({
    pickLocation: Yup.string().required("Pick location is required").matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
    dropLocation: Yup.string().required("Drop Location is required").matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
    dateTime: Yup.date().required("Date and Time is required").min(new Date(), "Date and Time must be in the future"),
    phoneNumber: Yup.string().required("Phone Number is required").matches(/^(?:\+94|0)?(?:7\d{8})$/, "Invalid Sri Lankan mobile number"),
    name: Yup.string().required("Name is required").matches(/^[A-Za-z\s]{3,}$/, "Name must contain at least 3 words and only letters"),
    email: Yup.string().required("Email is required").email("Invalid email address"),
});

const Booking = ({distance,setDistance}) => {
   // console.log(import.meta.env.VITE_OPENROUTESERVICE_API_KEY);
   // console.log(import.meta.env.VITE_OPEN_CAGE_API_KEY);
    const [startCoords, setStartCoords] = useState(null);
    const [endCoords, setEndCoords] = useState(null);
    const [routeCoords, setRouteCoords] = useState([]);

    const [duration, setDuration] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debouncedPickLocation, setDebouncedPickLocation] = useState("");
    const [debouncedDropLocation, setDebouncedDropLocation] = useState("");

  console.log(distance);
  

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
        onSubmit: (values) => {
            console.log(values);

        }
    });

    useEffect(() => {
        const pickTimer = setTimeout(() => {
            setDebouncedPickLocation(formik.values.pickLocation);
        }, 1500);

        const dropTimer = setTimeout(() => {
            setDebouncedDropLocation(formik.values.dropLocation);
        }, 1500);

        return () => {
            clearTimeout(pickTimer);
            clearTimeout(dropTimer);
        };
    }, [formik.values.pickLocation, formik.values.dropLocation]);

    const fetchCoordinates = async (city) => {
        if (!city.trim()) return null;

        try {
            const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
                params: {
                    key: import.meta.env.VITE_OPEN_CAGE_API_KEY,
                    q: city,
                    countrycode: "LK",
                    limit: 1,
                },
            });

            if (response.data.results.length === 0) {
                throw new Error("City not found.");
            }

            const result = response.data.results[0];

            if (!result.components || result.components.country_code !== "lk") {
                throw new Error("Location is outside Sri Lanka.");

            }

            return {
                lat: result.geometry.lat,
                lng: result.geometry.lng,
            };
        } catch (error) {
            console.error("Error fetching coordinates:", error.message);
            return null;
        }
    };

    useEffect(() => {
        const getDistance = async () => {
            if (!debouncedPickLocation || !debouncedDropLocation) {
                setStartCoords(null);
                setEndCoords(null);
                setRouteCoords([]);
                setDistance(null);
                setDuration(null);
                setError(null);
                return;
            }

            setLoading(true);
            setError(null);
            setDistance(null);
            setDuration(null);
            setRouteCoords([]);

            try {
                const start = await fetchCoordinates(debouncedPickLocation);
                const end = await fetchCoordinates(debouncedDropLocation);

                if (!start || !end) {
                    setError("Invalid Sri Lankan city names. Please try again.");
                    toast.error("Invalid Sri Lankan city names. Please try again.");
                    setStartCoords(null);
                    setEndCoords(null);
                    return;
                }

                setStartCoords(start);
                setEndCoords(end);

                const response = await axios.get("https://api.openrouteservice.org/v2/directions/driving-car", {
                    params: {
                        api_key: import.meta.env.VITE_OPENROUTESERVICE_API_KEY,
                        start: `${start.lng},${start.lat}`,
                        end: `${end.lng},${end.lat}`,
                    },
                });

                const distanceInKm = response.data.features[0].properties.segments[0].distance / 1000;
                const durationInSec = response.data.features[0].properties.segments[0].duration;

                setDistance(distanceInKm);
                setDuration(durationInSec / 60);

                const route = response.data.features[0].geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
                setRouteCoords(route);
            } catch (error) {
                console.error("Error calculating distance:", error.message);
                toast.error("Error calculating distance. Please try again.");
                setStartCoords(null);
                setEndCoords(null);
            } finally {
                setLoading(false);
            }
        };

        getDistance();
    }, [debouncedPickLocation, debouncedDropLocation]);

    return (
        <>
            <div className="absolute top-[60%] sm:top-[65%] md:top-[60%] lg:top-[60%] xl:top-[82%] 2xl:top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-4 px-6 rounded-lg shadow-lg w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-8/12 border-2 border-custom-opacity">
                               
                        <VehicleSelection  distance={distance} setDistance={setDistance}/>
                   
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
                                <p className="text-red-500 text-sm !mt-1">{formik.errors.pickLocation}</p>
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
                                <p className="text-red-500 text-sm !mt-0">{formik.errors.dropLocation}</p>
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
                                <p className="text-red-500 text-sm !mt-0">{formik.errors.dateTime}</p>
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
                                />
                            </div>
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <p className="text-red-500 text-sm !mt-0">{formik.errors.phoneNumber}</p>
                            )}

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full h-14 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm !mt-0">{formik.errors.name}</p>
                            )}


                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full h-14 px-4 border border-gray-300 rounded-md outline-none focus:outline-none"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm !mt-0 ">{formik.errors.email}</p>
                            )}



                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="fillDetails"
                                    checked={formik.values.fillDetails}
                                    onChange={formik.handleChange}
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
                                        <Marker position={[startCoords.lat, startCoords.lng]} icon={startIcon}>
                                            <Popup> Start Location: {formik.values.pickLocation}</Popup>
                                        </Marker>
                                    )}

                                    {endCoords && (
                                        <Marker position={[endCoords.lat, endCoords.lng]} icon={endIcon}>
                                            <Popup>End Location: {formik.values.dropLocation}</Popup>
                                        </Marker>
                                    )}

                                    <Polyline positions={routeCoords.map((point) => [point.lat, point.lng])} color="blue" weight={4} opacity={0.7} />

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
                                            ? (duration >= 60
                                                ? `${(duration / 60).toFixed(2)} h`
                                                : `${duration.toFixed(0)} minutes`)
                                            : "0.00 minutes"}
                                    </span>
                                </div>
                            </div>
                            <p className="text-red-500 text-sm mt-1">{error}</p>

                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={!formik.isValid || !formik.dirty}
                                    className={`bg-primary-yellow text-primary-black py-2 px-4 rounded-md text-lg shadow-lg ${!formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
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
    )
}

export default Booking