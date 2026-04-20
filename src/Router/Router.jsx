import * as ReactDOM from "react-dom/client";
import {createBrowserRouter} from "react-router-dom";
import Home from "../Home/Home";
import SignUp from "../pages/SignUp";
import Main from "../layouts/Main/Main";
import Login from "../pages/Login";
import FeaturedPlants from "../components/FeaturedPlants";
import Plants from "../pages/Plants";
import Secret from "./Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard/Dashboard";

import PlantCardDetails from "../components/PlantCardDetails";
import Cart from "../pages/Cart";







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
  {
    path:"/plant/:id",
    element:<PrivateRoute>
      <PlantCardDetails></PlantCardDetails>
    </PrivateRoute>,
    loader:({params})=>fetch(`http://localhost:3000/plants/${params.id}`)

  },
  {
    path:"/secret",
    element:<PrivateRoute>
      <Secret></Secret>
    </PrivateRoute>
  }
  ,{
    path:"/cart",
    element:<Cart></Cart>
  }

   
  
    
    ]
  },
  {
    path:"dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      // {
      //   path:"cart",
      //   element:<Cart></Cart>
      // }
    ]
  }
]);