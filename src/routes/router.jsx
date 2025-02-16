
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
        element: <Checkout/>
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
            {
                path:'',
                element:<AdminDashboard/>
            },



          
            
            {
                path:'admin',
                element:<PrivateRoute role="ADMIN"><AdminDashboardMain/></PrivateRoute>
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
                path:'manage-drivers',
                element:<PrivateRoute role="ADMIN"><ManageDriver/></PrivateRoute>
            },
           
           

           

        ]
    }
]);

export default router