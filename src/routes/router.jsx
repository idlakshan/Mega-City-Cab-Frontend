
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'
import Home from '../pages/Home';
import FAQ_Main from '../pages/FAQ_Main';
import AboutUs from '../pages/AboutUs';
const router=createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/about',
                element:<AboutUs/>
            },
            {
                path:'/faqs',
                element:<FAQ_Main/>
            }
        ]
    }
]);

export default router