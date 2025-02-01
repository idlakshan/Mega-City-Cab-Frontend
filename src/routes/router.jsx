
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'
import Home from '../pages/Home';
import FAQ_Main from '../pages/FAQ_Main';
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
                path:'/faqs',
                element:<FAQ_Main/>
            }
        ]
    }
]);

export default router