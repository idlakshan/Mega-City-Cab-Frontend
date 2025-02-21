
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'
import Home from '../pages/Home';
import FAQ_Main from '../pages/FAQ_Main';
import AboutUs from '../pages/AboutUs';
import Login from '../components/Login'
import Signup from '../components/Signup';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import AdminDashboardMain from '../pages/dashboard/admin/dashboard/AdminDashboardMain';
import ManageVehicle from '../pages/dashboard/admin/vehicle/ManageVehicle';
import ManageDriver from '../pages/dashboard/admin/driver/ManageDriver';
import AddVehicle from '../pages/dashboard/admin/vehicle/AddVehicle';
import UpdateVehicle from '../pages/dashboard/admin/vehicle/UpdateVehicle';
import Checkout from '../pages/Checkout';
import AddDriver from '../pages/dashboard/admin/driver/AddDriver';
import UpdateDriver from '../pages/dashboard/admin/driver/UpdateDriver';
import Success from '../pages/BookingSuccess';
import ManageUsers from '../pages/dashboard/admin/user/ManageUser';
import BookingTable from '../components/BookingTable';
import OngoingBookingsTable from '../components/OngoingBookingTable';


import Payment from '../pages/dashboard/customer/payment/Payment';
import CustomerDashboardMain from '../pages/dashboard/customer/dashboard/CustomerDashboardMain';
import MyTrip from '../pages/dashboard/customer/my-trip/MyTrip';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/faqs',
                element: <FAQ_Main />
            },
           
        ]


    },
    {
        path: '/checkout',
        element: <PrivateRoute role={["ADMIN", "CUSTOMER"]}><Checkout/></PrivateRoute>
    },

    {
        path: '/success',
        element: <PrivateRoute role={["ADMIN", "CUSTOMER"]}><Success/></PrivateRoute>
    },
    
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },

    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[

            //Customer routes

            {
                path:'',
                element:<CustomerDashboardMain/>
            },
            {
                path:'my-trips',
                element:<MyTrip/>
            },
            {
                path:'payments',
                element:<Payment/>
            },


         //admin routes
            {
                path:'admin',
                element:<PrivateRoute role="ADMIN"><AdminDashboardMain/></PrivateRoute>
            },
            {
                path:'ongoing-bookings',
                element:<PrivateRoute role="ADMIN"><OngoingBookingsTable/></PrivateRoute>
            },
            {
                path:'all-bookings',
                element:<PrivateRoute role="ADMIN"><BookingTable/></PrivateRoute>
            },
            {
                path:'add-vehicles',
                element:<PrivateRoute role="ADMIN"><AddVehicle/></PrivateRoute>
            },
            {
                path:'manage-vehicles',
                element:<PrivateRoute role="ADMIN"><ManageVehicle/></PrivateRoute>
            },
            {
                path:'edit-vehicle/:id',
                element:<PrivateRoute role="ADMIN"><UpdateVehicle/></PrivateRoute>
            },
            {
                path:'view-users',
                element:<PrivateRoute role="ADMIN"><ManageUsers/></PrivateRoute>
            },
            {
                path:'add-drivers',
                element:<PrivateRoute role="ADMIN"><AddDriver/></PrivateRoute>
            },
            
            {
                path:'manage-drivers',
                element:<PrivateRoute role="ADMIN"><ManageDriver/></PrivateRoute>
            },
            {
                path:'edit-driver/:id',
                element:<PrivateRoute role="ADMIN"><UpdateDriver/></PrivateRoute>
            },
           

        ]
    }
]);

export default router