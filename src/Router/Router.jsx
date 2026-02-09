import * as ReactDOM from "react-dom/client";
import {createBrowserRouter} from "react-router-dom";
import Home from "../Home/Home";
import SignUp from "../pages/SignUp";
import Main from "../layouts/Main/Main";
import Login from "../pages/Login";
import FeaturedPlants from "../components/FeaturedPlants";
import Plants from "../pages/Plants";






export const router = createBrowserRouter([
  {
    path:"/",
    element:<Main></Main>,
    children:[
      {
    path: "/",
    element: <Home></Home>,
  },
  {
    path:"/signUp",
    element:<SignUp></SignUp>
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/featuredPlants",
    element:<FeaturedPlants></FeaturedPlants>
  },
  {
    path:"/plants",
    element:<Plants></Plants>
  },

   
  
    
    ]
  }
]);