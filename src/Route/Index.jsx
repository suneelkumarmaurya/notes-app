import {createBrowserRouter ,Routes , Route} from 'react-router-dom';
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Signup from "../pages/Signup/Signup.jsx";
import App from '../App.jsx';
const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                path:"/",
                element:<Home />,
            },
            {
                path:"/login",
                element:<Login />,
            },
            {
                path:"/signup",
                element:<Signup />,
            },
        ]
    }
    
])

export default router